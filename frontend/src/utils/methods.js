import {conn} from './database';
import {User,Venue,Contest,Email,Email2,Email3,Team,Team_User} from './classes';

class Methods{
    teamUser = []

    teamObjects = [
        t = new Team(1, 'Real Madrazo', 3)
    ]

    usersObjects = [
        a = new User("seyerman@gmail.com", hash("contrasenia"), "seyerman", "Juan Manuel", "Reyes Garcia", "Colombia", true)
    ]
    
    contests = []
    
    venues = [
        new Venue(1, "Icesi"),
        new Venue(2, "Sanbue"),
        new Venue(3, "Jave")
    ]


    searchUser = (emailHashed) => {
        for (let i = 0; i < usersObjects.length; i++) {
            if (emailHashed === hash(usersObjects[i].email))
                return i;
        }
        return -1;
    }
    
    getTeamByName = (name) => {
        for (let i = 0; i < teamObjects.length; i++) {
            if (teamObjects[i].name === name)
                return teamObjects[i];
        }
        return null
    }
    
    getLastTeamId = () => {
        return (teamObjects[teamObjects.length - 1].id + 1);
    }
    
    getTeamIntegrant = (teamId, email) => {
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

    emailLogged = "";


    /*function hash(text) {
    let salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(text, salt)
}*/

    hash(text) {
	    var result = "";
	    for (var i = text.length - 1; i >= 0; i--)
		    result += text.charCodeAt(i).toString(16);
	    return result;
    }

    codeGenerator = (n) => {
        let code = ""
        for (let i = 0; i < n; i++) {
            let num = parseInt(Math.random() * (10 - 0) + 0);
            code += num.toString()
        }
    
        return code;
    
    }

    async getContestId() {
        let response = await conn.query("SELECT * FROM competencia");
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


}



export {Methods}