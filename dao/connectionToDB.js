const mysql = require('mysql2');
const conx = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456789',
    database: 'cv_builder'     
}); 

 function startConnection(){
    conx.connect((err) => {
        if (err) {
          console.error('Error connecting to MySQL:', err);
        } else {
          console.log('Connected to MySQL');
          createTables()
        }
      });
}
function createTables(){
    const createTablePersonal_info = `
    CREATE TABLE IF NOT EXISTS personal_info (
      id_user INT NOT NULL,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      phone VARCHAR(20),
      city VARCHAR(255),
      country VARCHAR(255),
      zipCode VARCHAR(10),
      filename VARCHAR(255)
    )
  `;
    createTable(createTablePersonal_info);
    
    const createTableUser = `
    CREATE TABLE IF NOT EXISTS user (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) ,
      password VARCHAR(255) 
    )
  `;
  createTable(createTableUser);

  const createTableExperience = `
    CREATE TABLE IF NOT EXISTS experience (
      id_user INT NOT NULL,
      id INT AUTO_INCREMENT PRIMARY KEY,
      employer VARCHAR(255) NOT NULL,
      jobTitle VARCHAR(255) NOT NULL,
      city VARCHAR(255),
      country VARCHAR(255),
      startDate VARCHAR(255),
      endDate VARCHAR(255),
      jobDescription TEXT
    )
  `;
  createTable(createTableExperience);
  
  const createTableEducation = `
    CREATE TABLE IF NOT EXISTS education (
      id_user INT NOT NULL,
      id INT AUTO_INCREMENT PRIMARY KEY,
      schoolName VARCHAR(255) NOT NULL,
      city VARCHAR(255),
      country VARCHAR(255),
      degree VARCHAR(255) NOT NULL,
      fieldOfStudy VARCHAR(255) NOT NULL,
      graduationDate VARCHAR(255)
    )
  `;
  createTable(createTableEducation);

  const createTableSkill = `
    CREATE TABLE IF NOT EXISTS skill (
        id_user INT NOT NULL,
        id INT AUTO_INCREMENT PRIMARY KEY,
        skill VARCHAR(255) NOT NULL,
        level INT
    )
    `;
  createTable(createTableSkill)

  const createTableSummary = `
    CREATE TABLE IF NOT EXISTS summary (
        id_user INT NOT NULL,
        summary TEXT NOT NULL
    )
    `;
  createTable(createTableSummary)
}

function createTable(createTableQuery){

    conx.query(createTableQuery, (err, results) => {
        if (err) {
        console.error('Error creating table:', err);
        } else {
        console.log('Table created or already exists');
        
        }
    });
}

function getConnection(){
    return conx;
}
function closeConnection(){
    conx.end();
}

async function insertData(insertDataQuery) {
    const [results, fields] = await conx.query(insertDataQuery);
    console.log('Data inserted successfully ')
    console.log('a ' +results.insertId)
    return results.insertId;;
}
  

module.exports = {startConnection: startConnection,
                    getConnection, getConnection}