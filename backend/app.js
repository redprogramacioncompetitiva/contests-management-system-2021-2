//bcrypt imports

const bcrypt = require('bcrypt');
const saltRounds = 10;

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

let usersObjects = [
    a = new User("seyerman@dejanosEnPaz.com", hash("contrasenia"), "seyerman", "Juan Manuel", "Reyes Garcia", "univalle", true)
]

let users = [
    {
        email: "seyerman@dejanosEnPaz.com",
        password: hash("contrasenia"),
        nickname: "seyerman",
        firstName: "Juan Manuel",
        lastName: "Reyes Garcia",
        country: "univalle",
        verified: true
    }

]

let authenticate = (email, password) => {
    for (let i = 0; i < users.length; i++) {
        if (email === users[i].email) {
            if (password === users[i].password) {
                return true;

            } else {
                return {
                    problem: "incorrect Password",
                    value: false
                }
            }
        } else {
            return {
                problem: "email not registered",
                value: false
            }
        }
    }
}

let addUsers = (email, password, nickname, firstName, lastName, country, verified) => {
    users.forEach(user => {
        if (user.email === email || user.nickname === nickname) {
            return false;
        }
    });
    let aux = new User(email, password, nickname, firstName, lastName, country, verified);
    usersObjects.push(aux);
    users.push(JSON.stringify(aux));
    return true;
}

const app = express();

app.post("/authenticate", (req, res) => {
    console.log("funciona");
    console.log(JSON.stringify(req))
    
    res.redirect("http://localhost:3000/register");
})

app.post("/register", (req, res) => {
    res.send(addUsers(
        req.body.email.value,
        hash(req.body.password.value),
        req.body.nickname.value,
        req.body.firstName.value,
        req.body.lastName.value,
        req.body.country.value,
        false
    ))
})

function hash(text) {
    let salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(text, salt)
}

app.get("/saludo",(req,res)=>{

    console.log(req.body);
})

app.listen(8080);