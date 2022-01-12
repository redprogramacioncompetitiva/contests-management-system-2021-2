import {conn} from '../../utils/database'
import {Methods} from '../../utils/methods';

export default async function handle(req,res){
    let contestKey = await Methods.getContestId()
    if (contestKey == -1) {
        res.json({
            flag: false,
            msg: 'Something went wrong, please try again',
            class: 'card p-3 w-50 shadow text-white w-auto text-center mt-3 error'
        });
        return
    } else {
        let venuesAndKeys = req.body.venues
        let venuesKeys = []
        let venues = []
        for (let i = 0; i < venuesAndKeys.length; i++) {
            let temp = venuesAndKeys[i].split(" – ")
            venues.push(temp[0])
            venuesKeys.push(temp[1])
        }
        let fecha_finalizacion = req.body.ContEndDate + ' ' + req.body.ContEndTime
        let fecha_inicio = req.body.ContStartDate + ' ' + req.body.ContStartTime
        let fecha_fin_ins = req.body.InscEndDate + ' ' + req.body.InscEndTime
        let fecha_inicio_ins = req.body.InscStartDate + ' ' + req.body.InscStartTime
        let maxCompetitors = parseInt(req.body.maxCompetitor, 10)
        let minCompetitors = parseInt(req.body.minCompetitor, 10)
        let response1 = await conn.query("SELECT * FROM competencia WHERE fecha_finalizacion = TO_TIMESTAMP($1, 'yyyy-mm-dd HH24:MI') AND fecha_inicio = TO_TIMESTAMP($2, 'yyyy-mm-dd HH24:MI') AND fecha_fin_ins = TO_TIMESTAMP($3, 'yyyy-mm-dd HH24:MI') AND fecha_inicio_ins = TO_TIMESTAMP($4, 'yyyy-mm-dd HH24:MI') AND nombre = $5 AND cantidadmaxporequipo = $6 AND cantidadminporequipo = $7", [fecha_finalizacion, fecha_inicio, fecha_fin_ins, fecha_inicio_ins, req.body.contestName, maxCompetitors, minCompetitors])
        if (response1.rows.length > 0) {
            //Si hay mas de una competencia en donde coincidan todos los datos, entonces se procede a comprobar por competencia que
            //ninguna tenga las mismas sedes que la competencia que se esta intentando agregar
            let atLeastOneIsEqual = false;
            for (let j = 0; j < response1.rows.length && !atLeastOneIsEqual; j++) {
                let response2 = await conn.query('SELECT codigo_institucion FROM es_sede WHERE codigo_competencia = $1', [response1.rows[j].codigo_competencia])
                let contestVenues1 = response2.rows
                let contestVenues = []
                for (let i = 0; i < contestVenues1.length; i++) {
                    contestVenues.push(contestVenues1[i].codigo_institucion)
                }
                let equal = false
                for (let i = 0; i < venuesKeys.length && !equal; i++) {
                    let temp = venuesKeys[i]
                    if (contestVenues.includes(temp))
                        equal = true
                }
                if (equal)
                    atLeastOneIsEqual = true
            }
            if (atLeastOneIsEqual) {
                res.json({
                    flag: false,
                    msg: 'There is already a contest in that date range with that name in at least one of the selected venues!',
                    class: 'card p-3 w-50 shadow text-white w-auto text-center mt-3 error'
                });
                return
            }
        }
        await conn.query("INSERT INTO competencia (codigo_competencia, fecha_finalizacion, fecha_inicio, fecha_fin_ins, fecha_inicio_ins, nombre, CantidadMaxPorEquipo, CantidadMinPorEquipo) VALUES ($1, TO_TIMESTAMP($2, 'yyyy-mm-dd HH24:MI'), TO_TIMESTAMP($3, 'yyyy-mm-dd HH24:MI'), TO_TIMESTAMP($4, 'yyyy-mm-dd HH24:MI'), TO_TIMESTAMP($5, 'yyyy-mm-dd HH24:MI'), $6, $7, $8)", [contestKey, fecha_finalizacion, fecha_inicio, fecha_fin_ins, fecha_inicio_ins, req.body.contestName, maxCompetitors, minCompetitors])
        for (let i = 0; i < venues.length; i++) {
            await conn.query("INSERT INTO es_sede VALUES ($1, $2)", [venuesKeys[i], contestKey])
        }
        res.json({
            flag: true
        });
    }
} 