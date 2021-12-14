const lastestAccesRange = 10; 
var fs = require('fs')
var file = fs.readFileSync('./app.txt', 'utf8');

class UserReport {
	constructor(id, nickname, type , email, rep, date) {
		this.id = id;
    this.nickname = nickname;
    this.type = type; 
    this.email = email;
    this.rep = rep;
    this.date = date;
	}
}

function usersLineToUsers(users){
  for (let i = 0; i < users.length; i++) {
    let date = users[i].split(" ")[0];

    //let info1 = users[i].split(" ");
    //info1[0] = "";
    console.log(date);

    let info = users[i].split(" ")[2];
    let email = users[i].split(" ")[4];
    let rol  = users[i].split(" ")[6];
    let nickname = users[i].split(" ")[8];

    reportsurl = "http://localhost:3000/generalReports/"+nickname

    users[i] = new UserReport(i, nickname, rol , email, reportsurl, date);

  }

  return users;
};

module.exports = class report {
  generateLastestAcces (){
    var users = [];

    // split the contents by new line
    const lines = file.split(/\r?\n/);

    // print all lines
    lines.forEach((line) => {
        users.push(line);
    });
     
    users = usersLineToUsers(users);
    
    return users
  }
};

class report {

  generateLastestAcces (){
    let users = [lastestAccesRange];
    let i = 0;
    users.forEach(element => {
      element = reader.nextLine();
      console.log(element)
      i += 1;
      
    });
    return users
  }

  generateGeneral (){
    let users = [lastestAccesRange];
    let i = 0;
    users.forEach(element => {
      element = lines[i];
      i += 1;
      
    });
    return users
  }

  generateIndividual (nickname){
    let users = [lastestAccesRange];
    let i = 0;
    users.forEach(element => {
      element = lines[i];
      i += 1;
      
    });
    return users
  }
}