//const bcrypt = require('bcrypt');
//const saltRounds = 10;
const sgMail = require('@sendgrid/mail');
const localHostPort = 8080;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



//express imports

const express = require('express');


const {Pool} = require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "juanpa1615",
    database: "Temporal",
    port: "5432"
});




class User {
    constructor(email, password, nickname, firstName, lastName, country, verified) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.firstName = firstName;
        this.lastName = lastName;
        this.country = country;
        this.verified = verified;
    }
}

class Email {
    constructor(email, url, nickname) {
        this.email = email;
        this.url = url;
        this.nickname = nickname
        this.fromEmail = 'peppapignea@gmail.com';
        this.fromName = 'Peppa Pig';
    }

    async sendEmail() {
        const mailOptions = {
            to: this.email,
            from: {
                email: this.fromEmail,
                name: this.fromName,
            },
            templateId: 'd-38484195aa134e15ad3d22d2311acc30',
            dynamic_template_data: {
                url_act: this.url,
                name: this.nickname,
                subject: 'Activa tu cuenta',
            },
        };
        await sgMail.send(mailOptions).then(() => { }, console.error);
    }
};

let usersObjects = [
    a = new User("seyerman@gmail.com", hash("contrasenia"), "seyerman", "Juan Manuel", "Reyes Garcia", "Colombia", true)
]

let searchUser = (emailHashed) => {
    for (let i = 0; i < usersObjects.length; i++) {
        if (emailHashed === hash(usersObjects[i].email))
            return i;
    }
    return -1;
}









const app = express();


const cors = require('cors')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors({
    origin:'http://localhost:3000'
}))






/*app.post("/authenticate", async(req, res) => {
    
  let response =  await pool.query("SELECT * FROM usuario WHERE email = $1 AND password = $2", [req.body.email,req.body.password])
  try {
    console.log(response.rows[0].nickname);
    res.json({
        flag : true,
        nickname: response.rows[0].nickname
        
    });
  } catch (error) {
      res.json({
          flag : false
          
      });
  }
})*/


/**
 * 
 */
app.post("/register", async (req, res) => {
    console.log(req.body);
    if (req.body.password != req.body.confirmpassword){
        res.json({
            flag: false,
            msg: 3
        })
    }else{
        try {
            let response = await pool.query('SELECT * FROM usuario WHERE email = $1',[req.body.email])
            if ((await response).rows.length > 0){
                res.json({
                    flag: false,
                    msg: 1
                })
            }else{
                let r = await pool.query('SELECT * FROM usuario WHERE nickname = $1',[req.body.nickname])
                if ((await r).rows.length > 0){
                    res.json({
                        flag: false,
                        msg: 2
                    })
                }else{
                    let re = await pool.query('INSERT INTO usuario (firstname, lastname, email, password, country, nickname, verified) VALUES ($1, $2, $3, $4,$5,$6,$7)', [req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.country, req.body.nickname, 0])
                    
                    res.json({
                        flag: true
                    })
                }
            }
        } catch (error) {
            
        }
    }
})

/*function hash(text) {
    let salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(text, salt)
}*/

function hash(text) {
    var result = "";
    for (var i = text.length - 1; i >= 0; i--)
        result += text.charCodeAt(i).toString(16);
    return result;
}

app.get("/activate/:id", (req, res) => {
    const emailId = req.params.id
    let index = searchUser(emailId)
    if (index !== -1) {
        usersObjects[index].verified = true
        //Te autenticaste correctamente. Bienvenid@ a la RPC!
        res.redirect('http://localhost:3000/activate/msg1')
    } else
        //URL de autenticación inválida.
        res.redirect('http://localhost:3000/activate/msg2')
})

app.get("/users", async (req, res) => {
    let users = await pool.query('SELECT * usuarios');
    res.json(users.rows)
})


let codeGenerator = (n)=>{
    let code = ""
    for (let i = 0; i < n; i++) {
        let num = parseInt(Math.random()*(10-0)+0);
        code += num.toString()
    }

    return code;
    
}


app.post("/recuperation/password/email", (req,res)=>{
    //enviar correo electrónico
    res.json({
        msg: req.body.email,
        code: codeGenerator(6)
    })
})

app.post("/recuperation/password/code", (req,res)=> {
    
})

app.get("/list", (req, res) => {
    res.send(usersObjects);
})



//micodigp

const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;

app.use(express.urlencoded({extended: true}));
app.use(cookieParser('mysecretsession'));
app.use(session({
    secret:'mi ultra super secreto',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new PassportLocal(async function(username,password, done){
    
    let response =await pool.query("SELECT * FROM usuario WHERE email = $1 AND password = $2", [username,password]);

    if(response.rows.length == 1){
       
        var id = response.rows[0].email;
        var nickname = response.rows[0].nickname;
        return done(null, {id: id  , name: nickname});
    }
    done(null, false);
}));

//1 => Serializacion
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//Deseralizacion
passport.deserializeUser(function(id, done){
    done(null, {id: 1, name: "cody"});
});

app.get("/login", (req, res) =>{
    //mostrar el login
    res.send(' \
    <form action="/login" method="post"> \
        <input type="text" name="username"> \
        <input type="password" name="password"> \
        <input type="submit" value="enviar"> \
    </form>'
    );
});

app.post("/authenticate", passport.authenticate('local'),function(req, res) {
        res.json({
            flag : true,
            nickname: req.user.name
        });  
  } );

app.get("/home",(req, res, next) =>{
    if(req.isAuthenticated()) return next(); 
    res.redirect("/login");
},(req,res) =>{
    res.send("SI estas registtrado");
});



//fin de mi codigo


    


app.get("/ejemplo", async (req,res)=>{
    let response = await pool.query('SELECT * FROM usuario');
    console.log(response.rows);
    res.json(response.rows);
} )


app.listen(localHostPort);