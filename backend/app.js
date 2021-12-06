//const bcrypt = require('bcrypt');
//const saltRounds = 10;
const sgMail = require('@sendgrid/mail');
const localHostPort = 8080;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//express imports

const express = require('express');

const { Pool } = require('pg');

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "password",
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
        await sgMail.send(mailOptions).then(() => { }, console.error);
    }
};

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

let authenticate = (email, password) => {
    for (let i = 0; i < usersObjects.length; i++) {
        if (email === usersObjects[i].email) {
            if (password === usersObjects[i].password) {
                if (usersObjects[i].verified)
                    return true;
            } else
                return false;
        }
    }
    return false;
}

let getUserByNickname = (nickname) => {
    for (let i = 0; i < usersObjects.length; i++) {
        if (usersObjects[i].nickname === nickname)
            return usersObjects[i];
    }
    return null
}

let getUserByEmail = (email) => {
    for (let i = 0; i < usersObjects.length; i++) {
        if (usersObjects[i].email === email)
            return usersObjects[i];
    }
    return null
}

let addUsers = (email, password, nickname, firstName, lastName, country, verified) => {
    let aux = new User(email, password, nickname, firstName, lastName, country, verified);
    usersObjects.push(aux);
    return true;
}

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post("/authenticate", (req, res) => {
    if (authenticate(req.body.email, hash(req.body.password)))
        res.redirect("http://localhost:3000/home/" + getUserByEmail(req.body.email).nickname);
    else
        res.redirect("http://localhost:3000/loginError");
})

app.post("/register", async (req, res) => {
    if (req.body.password !== req.body.password2) {
        //Las contraseñas no coinciden!
        res.redirect('http://localhost:3000/register/msg1')
        return;
    } else if (getUserByEmail(req.body.email) !== null) {
        //El email especificado ya existe!
        res.redirect('http://localhost:3000/register/msg2')
        return;
    } else if (getUserByNickname(req.body.nickname) !== null) {
        //El nickname especificado ya existe!
        res.redirect('http://localhost:3000/register/msg3')
        return;
    } else {
        let temp = addUsers(
            req.body.email,
            hash(req.body.password),
            req.body.nickname,
            req.body.firstName,
            req.body.lastName,
            req.body.country,
            false
        );
        let link = 'http://localhost:' + localHostPort + '/activate/' + hash(req.body.email);
        await new Email(req.body.email, link, req.body.nickname).sendEmail();
        //res.send(temp);
        res.redirect('http://localhost:3000/register/msg4')
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

app.get("/users", (req, res) => {
    res.send(usersObjects)
})

app.get("/venues", (req, res) => {
    res.send(venues)
})

app.get("/list", (req, res) => {
    res.send(usersObjects);
})

// Contest:
// codigo_competencia, fecha_finalizacion, fecha_inicio, fecha_fin_ins, fecha_incio_ins, nombre, cantidadmaxporequipo, cantidadminporequipo
// Venue:
// codigo_institucion, codigo_competencia
app.post("/createContest", async (req, res) => {
    console.log(req.body)
    let venuesStr = req.body.selectedVenuesList;
    let venues = venuesStr.split(',');
    let response1 = await pool.query('SELECT * FROM competencia WHERE codigo_competencia = $1 AND fecha_finalizacion = $2 AND fecha_inicio = $3, AND fecha_fin_ins = $4 AND fecha_incio_ins = $5 AND nombre = $6 AND cantidadmaxporequipo = $7 AND cantidadminporequipo = $8', ['COMP11', req.body.ContEndDate + ' ' + req.body.ContEndTime, req.body.ContStartDate + ' ' + req.body.ContStartTime, req.body.InscEndDate + ' ' + req.body.InscEndTime, req.body.InscStartDate + ' ' + req.body.InscStartTime, req.body.contestName, req.body.maxCompetitor, req.body.minCompetitor])
    if (response1.rows.length > 0) {
        let response2 = await pool.query("SELECT codigo_institucion FROM es_sede WHERE codigo_competencia = '" + response1.rows.codigo_competencia + "'")
        if (response2.rows.length > 0) {
            res.redirect('http://localhost:3000/createContest/msg1')
            return
        }
    }
    await pool.query("INSERT INTO competencia VALUES ($1, TO_DATE($2, 'dd/mm/yyyy hh24:mi:ss'), TO_DATE($3, 'dd/mm/yyyy hh24:mi:ss'), TO_DATE($4, 'dd/mm/yyyy hh24:mi:ss'), TO_DATE($5, 'dd/mm/yyyy hh24:mi:ss'), $6, $7, $8)", ['COMP11', req.body.ContEndDate + ' ' + req.body.ContEndTime, req.body.ContStartDate + ' ' + req.body.ContStartTime, req.body.InscEndDate + ' ' + req.body.InscEndTime, req.body.InscStartDate + ' ' + req.body.InscStartTime, req.body.contestName, req.body.maxCompetitor, req.body.minCompetitor])
    for (let i = 0; i < venues.length; i++) {
        let response = await pool.query("SELECT codigo_institucion FROM institucion WHERE nombre_institucion = '" + venues[i] + "'");
        await pool.query("INSERT INTO es_sede VALUES ($1, $2)", [response.rows[0].codigo_institucion, 'COMP11'])
    }
    res.redirect('http://localhost:3000/createContest/msg2')
})

app.listen(localHostPort);