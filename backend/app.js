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
    for (let i = 0; i < usersObjects.length; i++) {
        if (email == usersObjects[i].email) {
            if (password == usersObjects[i].password) {
                return true;

            } else {
                return false;
            }
        }
    }
    return false;
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

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post("/authenticate", (req, res) => {
    if (authenticate(req.body.email, hash(req.body.password))){
        res.redirect("https://youtube.com");
    }else{
        res.sendStatus(401);
    }
})

app.post("/register", (req, res) => {
    res.send(addUsers(
        req.body.email,
        hash(req.body.password),
        req.body.nickname,
        req.body.firstName,
        req.body.lastName,
        req.body.country,
        false
    ))
})

/*function hash(text) {
    let salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(text, salt)
}*/

function hash(text){
    var result = "";
    for (var i = text.length-1; i  >= 0 ; i--){
        result += text.charCodeAt(i).toString(16);
    }
    return result;
}

app.get("/saludo",(req,res)=>{

    console.log(req.body);
})

app.post('/ejemplo',(req,res) =>{







})

app.get("/prueba", (req,res)=>{
    res.send(users);
})

app.listen(8080);