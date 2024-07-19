var db = require('./connectionToDB')




function  insertUser(object){
    const insertDataQuery = `
      INSERT INTO user ()
      VALUES ()
    `;
    let id = db.insertData(insertDataQuery)
    console.log(id)
}

module.exports = {insertUser:insertUser}