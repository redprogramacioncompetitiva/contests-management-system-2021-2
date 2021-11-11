import User from './User'
//import bcrypt from 'bcrypt'

//saltRounds = 10;

//let a = new User();

class Verifier {

    usersObjects = [
        a = new User("seyerman@dejanosEnPaz.com", hash("contrasenia"), "seyerman", "Juan Manuel", "Reyes Garcia", "univalle", true)
    ]

    users = [
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

    authenticate = (email, password) => {
        for (let i = 0; i < users.length; i++) {
            if (email === users[i].email) {
                if (password === users[i].password) {
                    if (!users[i].verified)
                        alert("Email not verified. Please go to your email to activate your account.");
                    else {
                        let match = bcrypt.compareSync(users[i].password, password);
                        if (match)
                            return true;
                        else {
                            alert("Wrong password.");
                            return false
                        }
                    }
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

    addUsers = (email, password, nickname, firstName, lastName, country, verified) => {
        users.forEach(user => {
            if (user.email === email || user.nickname === nickname)
                return false;
        });
        let aux = new User(email, password, nickname, firstName, lastName, country, verified);
        usersObjects.push(aux);
        users.push(JSON.stringify(aux));
        return true;
    }

    /*hash(text) {
        let salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(text, salt)
    }*/

   /* hash(text){
        var result = "";
        for (var i = text.length-1; i  >= 0 ; i--){
            result += text.charCodeAt(i).toString(16);
        }
        return result;
    }*/
}



export default Verifier;