import {conn} from '../../utils/database'; 

export default async function handler(req, res) {
    switch (req.method){
        case "GET": res.statusCode = 404; break;
        case "POST":
            
            let response = await conn.query('SELECT * FROM usuario WHERE correoUser = $1 AND contraseña = $2', [req.body.email,req.body.password]);
            console.log(response.rows);
            if (response.rows && response.rows.length > 0){
                res.json({
                    flag: true,
                    nickname: response.rows[0].username
                });
            }else{
                res.json({
                    flag: false
                })
            }
            

            break;
    }    
}