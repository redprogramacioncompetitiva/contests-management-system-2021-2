import {conn} from '../../../utils/database';

export default async function handler(req,res) {
    const id = req.query.id;
    let integrants = await conn.query('SELECT a.firstname, a.lastname, a.email, a.country, a.nickname FROM usuario_equipo AS ab INNER JOIN usuario AS a ON a.email = ab.correouser WHERE ab.codigo_equipo = $1', [id]);
    if (integrants.rows){
        console.log(integrants.rows)
        res.json(integrants.rows);
    }
    else{
        res.send(404);
    }
}