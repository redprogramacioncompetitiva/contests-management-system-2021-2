//const bcrypt = require('bcrypt');
//const saltRounds = 10;
const sgMail = require('@sendgrid/mail');
const localHostPort = 8080;
sgMail.setApiKey('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');

//express imports

const express = require('express');

let messageIndex = 'hellou'

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
        this.fromEmail = 'pepitoperezprueba3@gmail.com';
        this.fromName = 'Pepito Perez';
    }

    async sendEmail() {
        const mailOptions = {
            to: this.email,
            from: {
                email: this.fromEmail,
                name: this.fromName,
            },
            templateId: 'd-6c9dd6013f044334b55a94fb25f1db9d',
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
        res.redirect("http://localhost:3000/home/"+getUserByEmail(req.body.email).nickname);
    else
        res.redirect("http://localhost:3000/Login");
})

app.post("/register", async (req, res) => {
    if (req.body.password !== req.body.password2) {
        //res.send("Las contraseñas no coinciden!");
        res.redirect('http://localhost:3000/register/msg1')
        return;
    } else if (getUserByEmail(req.body.email) !== null) {
        //res.send("El email especificado ya existe!");
        res.redirect('http://localhost:3000/register/msg2')
        return;
    } else if (getUserByNickname(req.body.nickname) !== null) {
        //res.send("El nickname especificado ya existe!");
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
    for (var i = text.length - 1; i >= 0; i--) {
        result += text.charCodeAt(i).toString(16);
    }
    return result;
}

app.get("/prueba", (req, res) => {
    //res.send("jeje")
})

app.get("/activate/:id", (req, res) => {
    const emailId = req.params.id
    let index = searchUser(emailId)
    if (index !== -1) {
        usersObjects[index].verified = true
        //res.send("Te autenticaste correctamente. Bienvenid@ a la RPC!")
        res.redirect('http://localhost:3000/activate/msg1')
    } else
        //res.send("URL de autenticación inválida.")
        res.redirect('http://localhost:3000/activate/msg2')
})

app.get("/users", (req, res) => {
    res.send(usersObjects)
})

app.get("/list",(req,res)=>{
    res.send(usersObjects);
})

app.listen(localHostPort);