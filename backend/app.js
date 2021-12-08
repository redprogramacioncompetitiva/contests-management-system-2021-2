//const bcrypt = require('bcrypt');
//const saltRounds = 10;
const sgMail = require('@sendgrid/mail');
const localHostPort = 8080;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


//express imports

const express = require('express');
const session = require('express-session');




const {Pool} = require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "password",
    database: "rpcdb",
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
		await sgMail.send(mailOptions).then(() => {
		}, console.error);
	}
};

class Team {
    constructor(id, name, integrants, userEmail) {
        this.id = id;
        this.name = name;
        this.integrants = integrants;
        this.userEmail = userEmail;
    }
};

class Team_User {
    constructor(idTeam, userEmail) {
        this.idTeam = idTeam;
        this.userEmail = userEmail;
    }
}

let teamUser = []

let teamObjects = [
    t = new Team(1, 'Real Madrazo', 3)
]

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

let getTeamByName = (name) => {
    for (let i = 0; i < teamObjects.length; i++) {
        if (teamObjects[i].name === name)
            return teamObjects[i];
    }
    return null
}

let getLastTeamId = () => {
    return (teamObjects[teamObjects.length - 1].id + 1);
}

let getTeamIntegrant = (teamId, email) => {
    for(c = 0; c < teamUser.length; c++) {
        if(teamUser[c].idTeam == teamId) {
            if(teamUser[c].userEmail == email) {
                for(i = 0; i < usersObjects.length; i++) {
                    if(usersObjects[i].email ==  email) {
                        return usersObjects[i];
                    }
                }
            }
        }
    }
    return null;
}

var emailLogged = "";

const app = express();


const cors = require('cors')
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
app.use(cors({
	origin: 'http://localhost:3000'
}))
app.use(session({
    secret:'123456',
    resave: true,
    saveUninitialized: true
}))


app.post("/createTeam", async (req, res) => {
    let response =  await pool.query("SELECT * FROM equipo WHERE nombre = $1", [req.body.name])
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
})

app.post("/deleteTeam", (req, res) => {
    let teamObjectsTemp = []
    for (let i = 0; i < teamObjects.length; i++) {
        if (teamObjects[i].id != req.body.teamId)
            teamObjectsTemp.push(teamObjects[i])
    }
    teamObjects = teamObjectsTemp;
    res.redirect("http://localhost:3000/teams/teams");
})

app.post("/editTeam", (req, res) => {
    res.redirect("http://localhost:3000/teams/"+req.body.teamId);
})

app.post("/addIntegrant", async (req, res) => {
    let email = req.body.email;
    let idTeam = req.body.teamId;
    let r = await pool.query('SELECT * FROM usuario_equipo WHERE codigo_equipo = $1 AND correouser = $2', [idTeam, email]);
    if((await r).rows.length < 1) {
        let r = await pool.query('INSERT INTO usuario_equipo VALUES($1,$2)', [idTeam, email]);
    } else {
        // Ya existe y no puede ser añadido de nuevo
    }
    let path = "http://localhost:3000/teams/" + idTeam;
    res.redirect(path);
})

app.post("/deleteIntegrant", (req, res) => {
    let email = req.body.email;
    let idTeam = req.body.teamId;
    let tempTeamUser = []
    for(c = 0; c < teamUser.length; c++) {
        if(teamUser[c].userEmail != email && teamUser[c].idTeam != idTeam) {
            tempTeamUser.push(teamUser[c]);
        }
    }
    teamUser = tempTeamUser;
    let path = "http://localhost:3000/teams/" + idTeam;
    res.redirect(path);
})

app.post("/authenticate", async (req, res) => {

	let response = await pool.query("SELECT * FROM usuario WHERE email = $1 AND password = $2", [req.body.email, req.body.password])
	try {
		console.log(response.rows[0].nickname);
		res.json({
			flag: true,
			nickname: response.rows[0].nickname

		});
	} catch (error) {
		res.json({
			flag: false

app.post("/authenticate", async(req, res) => {
    
  let response =  await pool.query("SELECT * FROM usuario WHERE email = $1 AND password = $2", [req.body.email,req.body.password])
  emailLogged = response.rows[0].email;
  console.log(emailLogged)
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
})


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


app.get("/integrants/:id", async (req, res) => {
    const id = req.params.id;
    let integrants = await pool.query('SELECT a.firstname, a.lastname, a.email, a.country, a.nickname FROM usuario_equipo AS ab INNER JOIN usuario AS a ON a.email = ab.correouser WHERE ab.codigo_equipo = $1', [id]);
    console.log(integrants.rows)
    res.json(integrants.rows);
})

app.get("/teams", async (req, res) => {
    let teams = await pool.query("SELECT a.codigo_equipo, a.nombre FROM usuario_equipo AS ab INNER JOIN equipo AS a ON a.codigo_equipo = ab.codigo_equipo WHERE correouser = $1;",[emailLogged]);
    res.json(teams.rows);
})

app.get("/users", async (req, res) => {
	let users = await pool.query('SELECT * usuarios');
	res.json(users.rows)
})


let codeGenerator = (n) => {
	let code = ""
	for (let i = 0; i < n; i++) {
		let num = parseInt(Math.random() * (10 - 0) + 0);
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

app.post("/recuperation/password/code", (req, res) => {


})

app.get("/list", (req, res) => {
	res.send(usersObjects);
})


//teams of contest -> endpoint
app.get("/contest/:id", async (req, res) => {

	const contestID = req.params.id

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
	let response = await pool.query(query)

	const data = await response.rows;

	res.json(data);
})

app.get("/contests", async (req,res)=>{
    let response = await pool.query('SELECT * FROM competencia');
    console.log(response.rows);
    res.json(response.rows);
})

//members of a team -> endpoint
app.get("/team/:id", async (req, res) => {
	const teamID = req.params.id

	const query = "SELECT u.username AS nickname, u.nombre AS firstname, u.apellido AS lastname, u.correouser AS email, p.nombre_pais AS country\n" +
		"FROM usuario u, pais p, usuario_equipo ut\n" +
		"WHERE (\n" +
		"ut.codigo_equipo = '" + teamID + "'\n"+
		"AND ut.correouser = u.correouser\n" +
		"AND u.codigo_pais = p.codigo_pais\n"+
		")\n"

	let response = await pool.query(query)

	const data = await response.rows;

	res.json(data);
})

app.get("/ejemplo", async (req, res) => {
	let response = await pool.query('SELECT * FROM usuario');
	console.log(response.rows);
	res.json(response.rows);
})


app.listen(localHostPort);