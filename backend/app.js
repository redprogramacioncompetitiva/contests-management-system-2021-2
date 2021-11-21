//const bcrypt = require('bcrypt');
//const saltRounds = 10;
const sgMail = require('@sendgrid/mail');
const localHostPort = 8080;
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
//name, InscStartDate, InscStartTime, InscEndDate, InscEndTime, ContStartDate, ContStartTime, ContEndDate, ContEndTime, venues
app.post("/createContest", (req, res) => {
    let venStr = req.body.selectedVenuesList;
    venStr = venStr.slice(0, -2);
    let ven = venStr.split(', ');
    let newContest = new Contest(req.body.competitionName, req.body.InscStartDate, req.body.InscStartTime, req.body.InscEndDate, req.body.InscEndTime, req.body.ContStartDate, req.body.ContStartTime, req.body.ContEndDate, req.body.ContEndTime, ven)
    let exists = false;
    contests.forEach(contest => {
        if (contest.name == newContest.name &&
            contest.InscStartDate == newContest.InscStartDate &&
            contest.InscStartTime == newContest.InscStartTime &&
            contest.InscEndDate == newContest.InscEndDate &&
            contest.InscEndTime == newContest.InscEndTime &&
            contest.ContStartDate == newContest.ContStartDate &&
            contest.ContStartTime == newContest.ContStartTime &&
            contest.ContEndDate == newContest.ContEndDate &&
            contest.ContEndTime == newContest.ContEndTime &&
            contest.venues == newContest.venues && !exists
        ) {
            exists = true;
            res.redirect('http://localhost:3000/createContest/msg1')
        }
    });
    if (!exists) {
        contests.push(newContest);
        res.redirect('http://localhost:3000/createContest/msg2')
    }

})

app.listen(localHostPort);