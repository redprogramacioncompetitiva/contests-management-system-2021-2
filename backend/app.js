//const bcrypt = require('bcrypt');
//const saltRounds = 10;
const sgMail = require('@sendgrid/mail');
const localHostPort = 8081;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//express imports

const express = require('express');

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

class Contest {
    constructor(name, startDate, endDate, registerEndDate) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.registerEndDate = registerEndDate;
    }
}

class Team {

    constructor(name, members) {
        this.name = name;
        this.members = members;
    }
}

let testUsers1 = [
    u1 = new User("pp@gmail.com", hash("12345"), "pp", "Pepe", 'Paso', "Bolivia", true),
    u2 = new User("aa@gmail.com", hash("fapjof"), "aa", "Ania", "Abc", "Checoslovaquia", true)

]

let teamObjects = [
    c = new Team("T1", testUsers1),
    d = new Team("T2", [new User("xx@gmail.com", hash("12345"), "xx", "Xena", 'Xeph', "Peru", true)])
]

let pastContestObjects = [
    p = new Contest("Summer Marathon 2015", "18/05/2015", "19/05/2015", "16/05/2015"),

]

let upcomingContestObjects = [

    u = new Contest("Winter Marathon 2021", "20/12/2021", "21/12/2021", "18/12/2021")
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
app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded

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

app.get("/list", (req, res) => {
    res.send(usersObjects);
})

app.get("/pc/:year/:search?", (req, res) => {
    const year = req.params.year
    const search = req.params.search

    console.log(year + search)

    res.send(pastContestObjects)
})

app.get("/uc", (req, res) => {
    res.send(upcomingContestObjects)
})

app.get("/contestTeams/:name", (req, res) => {
    const contestName = req.params.name
    res.send(teamObjects)
})

app.get("/teamMembers/:name", (req, res) => {
    const teamName = req.params.name
    res.send(testUsers1)
})

app.get("/download", (req, res) => {

        //To save a file
        const fs = require('fs');

        let data = JSON.stringify(testUsers1); //Change this for the info of the database
        console.log(data);

        fs.writeFile("../frontend/public/test", data, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
        res.sendStatus(200)
    }
)

app.listen(localHostPort);