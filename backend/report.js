
const lastestAccesRange = 10; 
var path = require('path');
var LineReader = require('node-line-reader').LineReader;
 
var reader = new LineReader('./app.log');

reader.nextLine(function (err, line) {
    if (!err) {
        return line;
    }
});

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