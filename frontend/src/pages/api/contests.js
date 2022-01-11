import {conn} from '../../utils/database';

export default async function(req,res){
    let response = await conn.query('SELECT * FROM competencia');
    console.log(response.rows);
    res.json(response.rows);
}