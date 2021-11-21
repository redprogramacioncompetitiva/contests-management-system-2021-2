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

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post("/createTeam", (req, res) => {
    if(getTeamByName(req.body.name) == null) {
        teamObjects.push(new Team(getLastTeamId(), req.body.name, req.body.integrants))
        res.redirect("http://localhost:3000/teams/teams");
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

app.post("/addIntegrant", (req, res) => {
    let email = req.body.email;
    let idTeam = req.body.teamId;
    console.log(teamUser);
    if(getTeamIntegrant(idTeam, email) == null) {
        teamUser.push(new Team_User(idTeam, email));
        let path = "http://localhost:3000/teams/" + idTeam;
        res.redirect(path);
    }
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

app.get("/integrants/:id", (req, res) => {
    const id = req.params.id;
    let tempIntegrants = [];
    for (c = 0; c < teamUser.length; c++) {
        if(teamUser[c].idTeam == id) {
            for (i = 0; i < usersObjects.length; i++) {
                if(usersObjects[i].email == teamUser[c].userEmail) {
                    tempIntegrants.push(usersObjects[i])
                }
            }
        }
    }
    //console.log(id);
    res.send(tempIntegrants);
})

app.get("/teams", (req, res) => {
    res.send(teamObjects);
})

app.get("/users", (req, res) => {
    res.send(usersObjects)
})

app.get("/list", (req, res) => {
    res.send(usersObjects);
})

app.listen(localHostPort);