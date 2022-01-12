import {conn} from '../../utils/database';
export default async function  Ejemplo(req, res) {

    let response = await conn.query('SELECT * FROM usuario');
    console.log(response.rows);
    res.json(response.rows);
  }