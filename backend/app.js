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

const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:3000'
}))

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

// Contest:
// codigo_competencia, fecha_finalizacion, fecha_inicio, fecha_fin_ins, fecha_incio_ins, nombre, cantidadmaxporequipo, cantidadminporequipo
// Venue:
// codigo_institucion, codigo_competencia
app.post("/createContest", async (req, res) => {
    let contestKey = await getContestId()
    if (contestKey == -1) {
        res.json({
            msg: 'omething went wrong, please try again',
            class: 'card p-3 w-50 shadow text-white w-auto text-center mt-3 error'
        });
        return
    } else {
        let venues = req.body.venues
        let venuesKeys = []
        for (let i = 0; i < venues.length; i++) {
            let venueKey = await pool.query('SELECT codigo_institucion FROM institucion WHERE nombre_institucion = $1', [venues[i]])
            venuesKeys.push(venueKey.rows[0].codigo_institucion)
        }
        let fecha_finalizacion = req.body.ContEndDate + ' ' + req.body.ContEndTime
        let fecha_inicio = req.body.ContStartDate + ' ' + req.body.ContStartTime
        let fecha_fin_ins = req.body.InscEndDate + ' ' + req.body.InscEndTime
        let fecha_inicio_ins = req.body.InscStartDate + ' ' + req.body.InscStartTime
        let maxCompetitors = parseInt(req.body.maxCompetitor, 10)
        let minCompetitors = parseInt(req.body.minCompetitor, 10)
        let response1 = await pool.query("SELECT * FROM competencia WHERE fecha_finalizacion = TO_TIMESTAMP($1, 'yyyy-mm-dd HH24:MI') AND fecha_inicio = TO_TIMESTAMP($2, 'yyyy-mm-dd HH24:MI') AND fecha_fin_ins = TO_TIMESTAMP($3, 'yyyy-mm-dd HH24:MI') AND fecha_inicio_ins = TO_TIMESTAMP($4, 'yyyy-mm-dd HH24:MI') AND nombre = $5 AND cantidadmaxporequipo = $6 AND cantidadminporequipo = $7", [fecha_finalizacion, fecha_inicio, fecha_fin_ins, fecha_inicio_ins, req.body.contestName, maxCompetitors, minCompetitors])
        if (response1.rows.length > 0) {
            console.log("entre")
            console.log(response1.rows)

            //Si hay mas de una competencia en donde coincidan todos los datos, entonces se procede a comprobar por competencia que
            //ninguna tenga las mismas sedes que la competencia que se esta intentando agregar
            let atLeastOneIsEqual = false;
            for (let j = 0; j < response1.rows.length && !atLeastOneIsEqual; j++) {
                let response2 = await pool.query('SELECT codigo_institucion FROM es_sede WHERE codigo_competencia = $1', [response1.rows[j].codigo_competencia])
                let venuesInDB1 = response2.rows
                let venuesInDB = []
                for (let i = 0; i < venuesInDB1.length; i++) {
                    venuesInDB.push(venuesInDB1[i].codigo_institucion)
                }
                console.log(venuesInDB)
                console.log(venuesKeys)
                if (venuesInDB.length > 0) {
                    console.log("entre 2")
                    let equal = false
                    for (let i = 0; i < venuesKeys.length && !equal; i++) {
                        let temp = venuesKeys[i]
                        console.log(temp)
                        if (venuesInDB.includes(temp))
                            equal = true
                    }
                    if (equal) {
                        console.log("entre 3")
                        atLeastOneIsEqual = true
                    }
                }
            }
            if (atLeastOneIsEqual) {
                console.log("entre 4")
                res.json({
                    msg: 'There is already a contest in that date range with that name in at least one of the selected venues!',
                    class: 'card p-3 w-50 shadow text-white w-auto text-center mt-3 error'
                });
                return
            }
        }
        await pool.query("INSERT INTO competencia (codigo_competencia, fecha_finalizacion, fecha_inicio, fecha_fin_ins, fecha_inicio_ins, nombre, CantidadMaxPorEquipo, CantidadMinPorEquipo) VALUES ($1, TO_TIMESTAMP($2, 'yyyy-mm-dd HH24:MI'), TO_TIMESTAMP($3, 'yyyy-mm-dd HH24:MI'), TO_TIMESTAMP($4, 'yyyy-mm-dd HH24:MI'), TO_TIMESTAMP($5, 'yyyy-mm-dd HH24:MI'), $6, $7, $8)", [contestKey, fecha_finalizacion, fecha_inicio, fecha_fin_ins, fecha_inicio_ins, req.body.contestName, maxCompetitors, minCompetitors])
        for (let i = 0; i < venues.length; i++) {
            let response = await pool.query("SELECT codigo_institucion FROM institucion WHERE nombre_institucion = '" + venues[i] + "'");
            await pool.query("INSERT INTO es_sede VALUES ($1, $2)", [response.rows[0].codigo_institucion, contestKey])
        }
        res.json({
            msg: 'Contest successfully created!',
            class: 'card p-3 w-50 shadow text-white w-auto text-center mt-3 success'
        });
    }
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

app.listen(localHostPort);