
import {conn} from '../../utils/database';

export default async function handler(req,res){
    let country = "";
    let school = "";
    console.log(req.body);
    if (req.body.password != req.body.confirmpassword){
        res.json({
            flag: false,
            msg: 3
        })
    }else{
        try {
            let response = await conn.query('SELECT * FROM usuario WHERE correouser = $1',[req.body.email])
            if (( response).rows.length > 0){
                res.json({
                    flag: false,
                    msg: 1
                })
            }else{
                let r = await conn.query('SELECT * FROM usuario WHERE username = $1',[req.body.nickname])
                if (( r).rows.length > 0){
                    res.json({
                        flag: false,
                        msg: 2
                    })
                }else{
                    
                        let response1 = await conn.query("SELECT * FROM pais WHERE nombre_pais = $1 ",[req.body.country])
                        if (response1.rows.length > 0){
                            country = response1.rows[0].codigo_pais
                            console.log(country)
                            
                        }else{
                            res.json({
                                flag: false,
                                msg: 5 
                            })
                        }
                    

                    
                        let response2 = await conn.query("SELECT * FROM institucion WHERE nombre_institucion = $1 ",[req.body.institution])
                        if (response2.rows.length>0){
                            school = response2.rows[0].codigo_institucion
                            console.log(school)
                        }else{
                            res.json({
                                flag: false,
                                msg: 4 
                            })
                        }
                    
                    let re = await conn.query("INSERT INTO usuario (username, nombre, apellido, descripcion, codigo_institucion, codigo_rol, contraseña,codigo_pais, correoUser) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9)", [req.body.nickname, req.body.firstname, req.body.lastname, req.body.description, school, 'R01', req.body.password,country,req.body.email])
                    
                    res.json({
                        flag: true
                    })
                }
            }
        } catch (error) {
            
        }
    }
}

