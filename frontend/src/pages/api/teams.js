import {conn} from '../../utils/database';
import {Methods} from '../../utils/methods'

export default async function handler(req, res) {
    let teams = await conn.query("SELECT a.codigo_equipo, a.nombre FROM usuario_equipo AS ab INNER JOIN equipo AS a ON a.codigo_equipo = ab.codigo_equipo WHERE correouser = $1;",["Giovanni@hotmail.com"]);
    res.json(teams.rows);
  }