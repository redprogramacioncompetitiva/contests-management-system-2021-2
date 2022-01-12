import {conn} from '../../../utils/database';
export default async function handler (req, res){
    const contestID = req.query.id

	const query = "SELECT t.codigo_equipo AS id_team,\n" +
		"t.nombre AS name,\n" +
		"(SELECT string_agg(u.username,', ')\n" +
		"FROM usuario u,\n" +
		"usuario_equipo ut\n" +
		"WHERE (\n" +
		"ut.codigo_equipo = t.codigo_equipo\n" +
		"AND ut.correouser = u.correouser\n" +
		")\n" +
		") AS members,\n" +
		"(SELECT SUM(tc.puntaje)\n" +
		"FROM equipo_competencia tc\n" +
		"WHERE t.codigo_equipo = tc.codigo_equipo\n" +
		")\n" +
		"AS score\n" +
		"FROM equipo t,\n" +
		"equipo_competencia tc\n" +
		"WHERE (\n" +
		"tc.codigo_competencia = '" + contestID + "'\n" +
		"AND t.codigo_equipo = tc.codigo_equipo\n" +
		")\n"
	let response = await conn.query(query)

	const data = await response.rows;

	res.json(data);
}