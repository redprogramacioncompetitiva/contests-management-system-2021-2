import {conn} from '../../utils/database';

export default async function handler(req,res){
    if (req.method === 'POST'){
        //Validar que el equipo existe en la base de datos
    let teamName = req.body.teamName
    let teamNameBD = await conn.query('SELECT * FROM equipo WHERE nombre = $1', [teamName])
    if(teamNameBD.rows.length > 0){
        //Validar que el equipo no este registrado en la misma competencia
        let codeTeam = teamNameBD.rows[0].codigo_equipo
        let response = await conn.query('SELECT codigo_competencia FROM equipo_competencia WHERE codigo_equipo = $1', [codeTeam])
        let oneCompetitionEqual = false
        let keyComp = req.body.keyComp.toUpperCase()
        if(response.rows.length > 0){
            for(let i = 0; i < response.rows.length && !oneCompetitionEqual; i++){
                if(response.rows[i].codigo_competencia === keyComp){
                    oneCompetitionEqual = true
                }
            }
            if(oneCompetitionEqual){
                res.json({
                    flag: false,
                    message:"El equipo ya esta registrado en esa competencia"
                })
                return 
            }
        }

        //Validar que la competencia exista
        let comp = await conn.query('SELECT * FROM competencia WHERE codigo_competencia = $1', [keyComp]) 
        if(comp.rows.length === 0){
            res.json({
                flag: false,
                message:"No existe una competencia con ese código"
            })
            return 
        }

        //Validar que la cantidad de integrantes que esten en el equipo cumplan con las restricciones de la competencia
        let teamMembers = await conn.query('SELECT * FROM usuario_equipo WHERE codigo_equipo = $1', [codeTeam])
        if(teamMembers.rows.length >= comp.rows[0].cantidadminporequipo && teamMembers.rows.length <= comp.rows[0].cantidadmaxporequipo){
            //Validar que ningun integrante se haya inscrito a la misma competencia con otro equipo
            let isRegistered = false
            let userRegistered
            let teamsInComp = await conn.query('SELECT * FROM equipo_competencia WHERE codigo_competencia = $1', [keyComp])
            for(let i=0; i < teamMembers.rows.length && !isRegistered; i++) {
                let tempEmail = teamMembers.rows[i].correouser
                let codeAllTeams = await conn.query('SELECT * FROM usuario_equipo WHERE correouser = $1', [tempEmail])
                for(let j=0; j < teamsInComp.rows.length && !isRegistered; j++){
                    let tempComp = teamsInComp.rows[j].codigo_equipo
                    for(let k=0; k < codeAllTeams.rows.length && !isRegistered; k++){
                        if(codeAllTeams.rows[k].codigo_equipo === tempComp){
                            isRegistered = true
                            userRegistered = tempEmail
                        }
                    }
                }
            }
            if(isRegistered){
                res.json({
                    flag: false,
                    message:"El usuario con correo: " + userRegistered +" ya se encuentra registrado en esta competencia"
                })
                return 
            }

            //Validar que la fecha de inicio de la competencia no se cruce con otra competencia que la persona este inscrita
            let userCrossed
            let compCrossed
            let isCrossed = false
            for(let i=0; i < teamMembers.rows.length && !isCrossed; i++) {
                let tempEmail = teamMembers.rows[i].correouser
                let codeAllTeams = await conn.query('SELECT * FROM usuario_equipo WHERE correouser = $1', [tempEmail])
                let compsOfMember = []
                for(let j=0; j < codeAllTeams.rows.length; j++){
                    compOfTeam = await conn.query('SELECT codigo_competencia FROM equipo_competencia WHERE codigo_equipo = $1', [codeAllTeams.rows[j].codigo_equipo])
                    for(let k=0; k < compOfTeam.rows.length; k++){
                        compsOfMember.push(compOfTeam.rows[k].codigo_competencia)
                    }
                    
                }
                let date = new Date(comp.rows[0].fecha_inicio)
                let dateEnd = new Date(comp.rows[0].fecha_finalizacion)
/*                 console.log(date.getHours())
                console.log(date.getMinutes())
                console.log(date.getSeconds())
                console.log(date.getDate())
                console.log(date.getMonth()+1)
                console.log(date.getFullYear())  */
                for(let j=0; j<compsOfMember.length && !isCrossed; j++){
                    let tempComp = await conn.query('SELECT * FROM competencia WHERE codigo_competencia = $1', [compsOfMember[j]]) 
                    let tempDateStart = new Date(tempComp.rows[0].fecha_inicio)
/*                     console.log(tempDateStart.getHours())
                    console.log(tempDateStart.getMinutes())
                    console.log(tempDateStart.getSeconds())
                    console.log(tempDateStart.getDate())
                    console.log(tempDateStart.getMonth()+1)
                    console.log(tempDateStart.getFullYear())  */
                    //Si las fechas son las mismas
                    if(tempDateStart.getFullYear()===date.getFullYear() && tempDateStart.getMonth()===date.getMonth() && tempDateStart.getDate()===date.getDate()){
                        if(tempDateStart.getHours() >= dateEnd.getHours() && tempDateStart.getHours() <= date.getHours()){
                            isCrossed = true
                            userCrossed = tempEmail
                            compCrossed = compsOfMember[j]
                        }
                    }
                }
            }
            if(isCrossed){
                res.json({
                    flag: false,
                    message:"No es posible registrarse porque la fecha de la competencia " + compCrossed + " con el participante " + userCrossed + "se cruza con esta competencia"
                })
                return 
            }else{
                //Se registra el equipo en la competencia
                await conn.query("INSERT INTO equipo_competencia VALUES ($1, $2)", [codeTeam, keyComp])
                //Enviar correos 
                let team_Name = teamName
                let members = ""
                for(let i=0; i<teamMembers.rows.length; i++){
                    if(i!==teamMembers.rows.length-1){
                        members += teamMembers.rows[i].correouser +", "
                    }else{
                        members += teamMembers.rows[i].correouser
                    }
                    
                }
                let codeCompetition = keyComp
                let tempComp = await conn.query('SELECT * FROM competencia WHERE codigo_competencia = $1', [keyComp]) 
                let tempDateStart = new Date(tempComp.rows[0].fecha_inicio)
                let start_date = tempDateStart.getDate() + "/" + (tempDateStart.getMonth()+1) + "/" + tempDateStart.getFullYear()
                let start_hour = tempDateStart.getHours() + ":" + tempDateStart.getMinutes() + ":" + tempDateStart.getSeconds()
                tempDateStart = new Date(tempComp.rows[0].fecha_finalizacion)
                let end_date = tempDateStart.getDate() + "/" + (tempDateStart.getMonth()+1) + "/" + tempDateStart.getFullYear()
                let end_hour = tempDateStart.getHours() + ":" + tempDateStart.getMinutes() + ":" + tempDateStart.getSeconds()
                for(let i=0; i<teamMembers.rows.length; i++){
                    let correo = new Email2(teamMembers.rows[i].correouser, teamName, members, codeCompetition, start_date, start_hour, end_date, end_hour)
                    await correo.sendContestEmail()
                }
                res.json({
                    flag: true,
                    message:"El equipo ha sido registrado exitosamente"
                })
                return 

            }
            
        }else{
            res.json({
                flag: false,
                message:"El equipo no cumple con la cantidad de integrantes requerida para la competencia"
            })
            return 
        }
        
       
    }else{
        res.json({
            flag: false,
            message:"El nombre del equipo no se encuentra registrado en la base de datos"
        })
    }
    
    
    }

}