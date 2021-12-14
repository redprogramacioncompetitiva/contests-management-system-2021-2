//const bcrypt = require('bcrypt');
//const saltRounds = 10;
const sgMail = require('@sendgrid/mail')
const localHostPort = 8080;

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//logger
const logger = require("./logger")
//express imports
const reporter = require("./report")


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

class Venue {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Contest {
    constructor(name, InscStartDate, InscStartTime, InscEndDate, InscEndTime, ContStartDate, ContStartTime, ContEndDate, ContEndTime, venues) {
        this.name = name;
        this.InscStartDate = InscStartDate;
        this.InscStartTime = InscStartTime;
        this.InscEndDate = InscEndDate;
        this.InscEndTime = InscEndTime;
        this.ContStartDate = ContStartDate;
        this.ContStartTime = ContStartTime;
        this.ContEndDate = ContEndDate;
        this.ContEndTime = ContEndTime;
        this.venues = venues;
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

async function sendEmailPasswordRecovery(email, subject){

        this.email = email;
		this.fromName = 'rpc';
        this.subject = subject

        const mailOptions = {
			to: this.email,
			from: {
				email: "programacioncompetitiva@hotmail.com",
				name: "rpc",
			},
			templateId: 'd-38484195aa134e15ad3d22d2311acc30',
			dynamic_template_data: {
				url_act: this.url,
				name: "ander",
				subject: 'Activa tu cuenta',
			},
		};
		await sgMail.send(mailOptions).then(() => {
		}, console.error);
}

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

let contests = []

let venues = [
    new Venue(1, "Icesi"),
    new Venue(2, "Sanbue"),
    new Venue(3, "Jave")
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



app.post("/authenticate", async(req, res) => {

    
  let response =  await pool.query("SELECT * FROM usuario WHERE correoUser = $1 AND contraseña = $2", [req.body.email,req.body.password])
  

  try {
    let emailLogged = response.rows[0].correouser;
    console.log(emailLogged)
    console.log(response.rows[0].username);
    res.json({
        flag : true,
        nickname: response.rows[0].username
        
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
            let response = await pool.query('SELECT * FROM usuario WHERE correouser = $1',[req.body.email])
            if (( response).rows.length > 0){
                res.json({
                    flag: false,
                    msg: 1
                })
            }else{
                let r = await pool.query('SELECT * FROM usuario WHERE username = $1',[req.body.nickname])
                if (( r).rows.length > 0){
                    res.json({
                        flag: false,
                        msg: 2
                    })
                }else{
                    
                        let response1 = await pool.query("SELECT * FROM pais WHERE nombre_pais = $1 ",[req.body.country])
                        if (response1.rows.length > 0){
                            country = response1.rows[0].codigo_pais
                            console.log(country)
                            
                        }else{
                            res.json({
                                flag: false,
                                msg: 5 
                            })
                        }
                    

                    
                        let response2 = await pool.query("SELECT * FROM institucion WHERE nombre_institucion = $1 ",[req.body.institution])
                        if (response2.rows.length>0){
                            school = response2.rows[0].codigo_institucion
                            console.log(school)
                        }else{
                            res.json({
                                flag: false,
                                msg: 4 
                            })
                        }
                    
                    let re = await pool.query("INSERT INTO usuario (username, nombre, apellido, descripcion, codigo_institucion, codigo_rol, contraseña,codigo_pais, correoUser) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9)", [req.body.nickname, req.body.firstname, req.body.lastname, req.body.description, school, 'R01', req.body.password,country,req.body.email])
                    
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

let code = codeGenerator(6)

app.post("/recuperation/password/email", async (req,res)=>{
    //enviar correo electrónico

    let response =  await pool.query("SELECT * FROM usuario WHERE correouser = $1", [req.body.email])
    if ((await response).rows.length > 0){

        let email = req.body.email
        console.log(code)

        sendEmailPasswordRecovery(email, code)


        res.json({
            flag: true,
            
            code: codeGenerator(6)
        })

        sendEmailPasswordRecovery(email, codeGenerator)
        
    } else {

        res.json({
            flag: false,
        })
    }
})

app.post("/recuperation/password/code", (req, res) => {


    let codetemp = req.body.code

    console.log(codetemp)

    if(codetemp==code){

        res.json({flag: false,
        })

    }else{

        res.json({
            flag: true,
        })

    }



})

app.get("/venues", async (req, res) => {
    let response = await pool.query("SELECT * FROM institucion")
    try {
        res.send(response.rows)
    } catch (error) {
        res.send(error)
    }
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

// Contest:
// codigo_competencia, fecha_finalizacion, fecha_inicio, fecha_fin_ins, fecha_incio_ins, nombre, cantidadmaxporequipo, cantidadminporequipo
// Venue:
// codigo_institucion, codigo_competencia
app.post("/createContest", async (req, res) => {
    let contestKey = await getContestId()
    if (contestKey == -1) {
        res.json({
            flag: false,
            msg: 'Something went wrong, please try again',
            class: 'card p-3 w-50 shadow text-white w-auto text-center mt-3 error'
        });
        return
    } else {
        let venuesAndKeys = req.body.venues
        let venuesKeys = []
        let venues = []
        for (let i = 0; i < venuesAndKeys.length; i++) {
            let temp = venuesAndKeys[i].split(" – ")
            venues.push(temp[0])
            venuesKeys.push(temp[1])
        }
        let fecha_finalizacion = req.body.ContEndDate + ' ' + req.body.ContEndTime
        let fecha_inicio = req.body.ContStartDate + ' ' + req.body.ContStartTime
        let fecha_fin_ins = req.body.InscEndDate + ' ' + req.body.InscEndTime
        let fecha_inicio_ins = req.body.InscStartDate + ' ' + req.body.InscStartTime
        let maxCompetitors = parseInt(req.body.maxCompetitor, 10)
        let minCompetitors = parseInt(req.body.minCompetitor, 10)
        let response1 = await pool.query("SELECT * FROM competencia WHERE fecha_finalizacion = TO_TIMESTAMP($1, 'yyyy-mm-dd HH24:MI') AND fecha_inicio = TO_TIMESTAMP($2, 'yyyy-mm-dd HH24:MI') AND fecha_fin_ins = TO_TIMESTAMP($3, 'yyyy-mm-dd HH24:MI') AND fecha_inicio_ins = TO_TIMESTAMP($4, 'yyyy-mm-dd HH24:MI') AND nombre = $5 AND cantidadmaxporequipo = $6 AND cantidadminporequipo = $7", [fecha_finalizacion, fecha_inicio, fecha_fin_ins, fecha_inicio_ins, req.body.contestName, maxCompetitors, minCompetitors])
        if (response1.rows.length > 0) {
            //Si hay mas de una competencia en donde coincidan todos los datos, entonces se procede a comprobar por competencia que
            //ninguna tenga las mismas sedes que la competencia que se esta intentando agregar
            let atLeastOneIsEqual = false;
            for (let j = 0; j < response1.rows.length && !atLeastOneIsEqual; j++) {
                let response2 = await pool.query('SELECT codigo_institucion FROM es_sede WHERE codigo_competencia = $1', [response1.rows[j].codigo_competencia])
                let contestVenues1 = response2.rows
                let contestVenues = []
                for (let i = 0; i < contestVenues1.length; i++) {
                    contestVenues.push(contestVenues1[i].codigo_institucion)
                }
                let equal = false
                for (let i = 0; i < venuesKeys.length && !equal; i++) {
                    let temp = venuesKeys[i]
                    if (contestVenues.includes(temp))
                        equal = true
                }
                if (equal)
                    atLeastOneIsEqual = true
            }
            if (atLeastOneIsEqual) {
                res.json({
                    flag: false,
                    msg: 'There is already a contest in that date range with that name in at least one of the selected venues!',
                    class: 'card p-3 w-50 shadow text-white w-auto text-center mt-3 error'
                });
                return
            }
        }
        await pool.query("INSERT INTO competencia (codigo_competencia, fecha_finalizacion, fecha_inicio, fecha_fin_ins, fecha_inicio_ins, nombre, CantidadMaxPorEquipo, CantidadMinPorEquipo) VALUES ($1, TO_TIMESTAMP($2, 'yyyy-mm-dd HH24:MI'), TO_TIMESTAMP($3, 'yyyy-mm-dd HH24:MI'), TO_TIMESTAMP($4, 'yyyy-mm-dd HH24:MI'), TO_TIMESTAMP($5, 'yyyy-mm-dd HH24:MI'), $6, $7, $8)", [contestKey, fecha_finalizacion, fecha_inicio, fecha_fin_ins, fecha_inicio_ins, req.body.contestName, maxCompetitors, minCompetitors])
        for (let i = 0; i < venues.length; i++) {
            await pool.query("INSERT INTO es_sede VALUES ($1, $2)", [venuesKeys[i], contestKey])
        }
        res.json({
            flag: true
        });
    }
})

app.get("/institutions", async (req,res)=>{
    let response = await pool.query("SELECT nombre_institucion FROM institucion");

    res.send(response.rows);
})

async function getContestId() {
    let response = await pool.query("SELECT * FROM competencia");
    try {
        let numComps = response.rows.length
        let newKey
        if (numComps > 0) {
            let lastKey = response.rows[numComps - 1].codigo_competencia
            let idNum = parseInt(lastKey.slice(4), 10)
            let newId = idNum + 1
            newKey = 'COMP' + newId
        } else
            newKey = 'COMP1'
        return newKey
    } catch (error) {
        return -1
    }
}
/*Registrarse en una competencia*/

// Metodo de validacion de equipo existente.
app.post("/registerInCompetition", async (req,res)=>{
    //Validar que el equipo existe en la base de datos
    let teamName = req.body.teamName
    let teamNameBD = await pool.query('SELECT * FROM equipo WHERE nombre = $1', [teamName])
    if(teamNameBD.rows.length > 0){
        //Validar que el equipo no este registrado en la misma competencia
        let codeTeam = teamNameBD.rows[0].codigo_equipo
        let response = await pool.query('SELECT codigo_competencia FROM equipo_competencia WHERE codigo_equipo = $1', [codeTeam])
        let oneCompetitionEqual = false
        let keyComp = req.body.keyComp.toUpperCase()
        if(response.rows.length > 0){
            for(let i = 0; i < response.rows.length && !oneCompetitionEqual; i++){
                if(response.rows[i].codigo_competencia === keyComp){
                    oneCompetitionEqual = true
                }
            }
            if(oneCompetitionEqual){
                res.json({
                    flag: false,
                    message:"El equipo ya esta registrado en esa competencia"
                })
                return 
            }
        }

        //Validar que la competencia exista
        let comp = await pool.query('SELECT * FROM competencia WHERE codigo_competencia = $1', [keyComp]) 
        if(comp.rows.length === 0){
            res.json({
                flag: false,
                message:"No existe una competencia con ese código"
            })
            return 
        }

        //Validar que la cantidad de integrantes que esten en el equipo cumplan con las restricciones de la competencia
        let teamMembers = await pool.query('SELECT * FROM usuario_equipo WHERE codigo_equipo = $1', [codeTeam])
        if(teamMembers.rows.length >= comp.rows[0].cantidadminporequipo && teamMembers.rows.length <= comp.rows[0].cantidadmaxporequipo){
            //Validar que ningun integrante se haya inscrito a la misma competencia con otro equipo
            let isRegistered = false
            let userRegistered
            let teamsInComp = await pool.query('SELECT * FROM equipo_competencia WHERE codigo_competencia = $1', [keyComp])
            for(let i=0; i < teamMembers.rows.length && !isRegistered; i++) {
                let tempEmail = teamMembers.rows[i].correouser
                let codeAllTeams = await pool.query('SELECT * FROM usuario_equipo WHERE correouser = $1', [tempEmail])
                for(let j=0; j < teamsInComp.rows.length && !isRegistered; j++){
                    let tempComp = teamsInComp.rows[j].codigo_equipo
                    for(let k=0; k < codeAllTeams.rows.length && !isRegistered; k++){
                        if(codeAllTeams.rows[k].codigo_equipo === tempComp){
                            isRegistered = true
                            userRegistered = tempEmail
                        }
                    }
                }
            }
            if(isRegistered){
                res.json({
                    flag: false,
                    message:"El usuario con correo: " + userRegistered +" ya se encuentra registrado en esta competencia"
                })
                return 
            }

            //Validar que la fecha de inicio de la competencia no se cruce con otra competencia que la persona este inscrita
            let userCrossed
            let compCrossed
            let isCrossed = false
            for(let i=0; i < teamMembers.rows.length && !isCrossed; i++) {
                let tempEmail = teamMembers.rows[i].correouser
                let codeAllTeams = await pool.query('SELECT * FROM usuario_equipo WHERE correouser = $1', [tempEmail])
                let compsOfMember = []
                for(let j=0; j < codeAllTeams.rows.length; j++){
                    compOfTeam = await pool.query('SELECT codigo_competencia FROM equipo_competencia WHERE codigo_equipo = $1', [codeAllTeams.rows[j].codigo_equipo])
                    for(let k=0; k < compOfTeam.rows.length; k++){
                        compsOfMember.push(compOfTeam.rows[k].codigo_competencia)
                    }
                    
                }
                let date = new Date(comp.rows[0].fecha_inicio)
                let dateEnd = new Date(comp.rows[0].fecha_finalizacion)
/*                 console.log(date.getHours())
                console.log(date.getMinutes())
                console.log(date.getSeconds())
                console.log(date.getDate())
                console.log(date.getMonth()+1)
                console.log(date.getFullYear())  */
                for(let j=0; j<compsOfMember.length && !isCrossed; j++){
                    let tempComp = await pool.query('SELECT * FROM competencia WHERE codigo_competencia = $1', [compsOfMember[j]]) 
                    let tempDateStart = new Date(tempComp.rows[0].fecha_inicio)
/*                     console.log(tempDateStart.getHours())
                    console.log(tempDateStart.getMinutes())
                    console.log(tempDateStart.getSeconds())
                    console.log(tempDateStart.getDate())
                    console.log(tempDateStart.getMonth()+1)
                    console.log(tempDateStart.getFullYear())  */
                    //Si las fechas son las mismas
                    if(tempDateStart.getFullYear()===date.getFullYear() && tempDateStart.getMonth()===date.getMonth() && tempDateStart.getDate()===date.getDate()){
                        if(tempDateStart.getHours() >= dateEnd.getHours() && tempDateStart.getHours() <= date.getHours()){
                            isCrossed = true
                            userCrossed = tempEmail
                            compCrossed = compsOfMember[j]
                        }
                    }
                }
            }
            if(isCrossed){
                res.json({
                    flag: false,
                    message:"No es posible registrarse porque la fecha de la competencia " + compCrossed + " con el participante " + userCrossed + "se cruza con esta competencia"
                })
                return 
            }else{
                //Se registra el equipo en la competencia
                await pool.query("INSERT INTO equipo_competencia VALUES ($1, $2)", [codeTeam, keyComp])
                res.json({
                    flag: true,
                    message:"El equipo ha sido registrado exitosamente"
                })
                return 

            }
            
        }else{
            res.json({
                flag: false,
                message:"El equipo no cumple con la cantidad de integrantes requerida para la competencia"
            })
            return 
        }
        
       
    }else{
        res.json({
            flag: false,
            message:"El nombre del equipo no se encuentra registrado en la base de datos"
        })
    }
    
    

})

app.get("/lastUsersRecord", async (req,res)=>{
    const r = new reporter();
    res.send(r.generateLastestAcces());
})

app.listen(localHostPort);