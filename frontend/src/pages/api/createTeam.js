import { conn } from "../../utils/database";


export default async function handler(req, res) {
    if (req.method === "POST"){
        let response =  await conn.query("SELECT * FROM equipo WHERE nombre = $1", [req.body.name])
    if ((await response).rows.length > 0){
        console.log('Already exists')
        let path = "http://localhost:3000/teams/teams";
        res.redirect(path);
    } else {
        let r1 = await pool.query("INSERT INTO equipo (nombre, ownerEmail) VALUES ($1,$2);", [req.body.name, emailLogged])
        let id = await pool.query("SELECT * FROM equipo ORDER BY codigo_equipo DESC LIMIT 1")
        let r = await pool.query('INSERT INTO usuario_equipo VALUES($1,$2)', [id.rows[0].codigo_equipo, emailLogged]);
        console.log('It can be created')
        let path = "http://localhost:3000/teams/" + id.rows[0].codigo_equipo;
        res.redirect(path);
    }
    }
  }