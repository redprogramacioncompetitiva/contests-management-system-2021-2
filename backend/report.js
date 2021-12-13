
const lastestAccesRange = 10; 
const lineReader = require('line-reader');
let lines = lineReader.eachLine('./app.log');

class report {

  generateLastestAcces (){
    let users = [lastestAccesRange];
    let i = 0;
    users.forEach(element => {
      element = lines[i];
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