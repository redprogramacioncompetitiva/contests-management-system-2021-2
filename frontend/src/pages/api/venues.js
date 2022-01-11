    import {conn} from '../../utils/database';
    
    export default async function handler(req,res){
        let response = await conn.query("SELECT * FROM institucion")
    try {
        res.send(response.rows)
    } catch (error) {
        res.send(error)
    }
    }
