const lastestAccesRange = 10; 
var path = require('path');
var LineReader = require('node-line-reader').LineReader;
 
var reader = new LineReader('./app.txt');

var buffer = new Buffer.alloc(42);

module.exports = class report {
  generateLastestAcces (){
    let users = [];
    var line = "";

    for (let i = 0; i < lastestAccesRange; i++) {
      line = reader.nextLine(function (err, line) {
        users.push(line);

      });
    }

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