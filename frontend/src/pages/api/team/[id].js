import {conn} from '../../../utils/database';
export default async function handler (req,res){
    const teamID = req.query.id

	const query = "SELECT u.username AS nickname, u.nombre AS firstname, u.apellido AS lastname, u.correouser AS email, p.nombre_pais AS country\n" +
		"FROM usuario u, pais p, usuario_equipo ut\n" +
		"WHERE (\n" +
		"ut.codigo_equipo = '" + teamID + "'\n"+
		"AND ut.correouser = u.correouser\n" +
		"AND u.codigo_pais = p.codigo_pais\n"+
		")\n"

	let response = await conn.query(query)

	const data = await response.rows;

	res.json(data);
}