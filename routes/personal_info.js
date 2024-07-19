var express = require('express')
const multer = require('multer');
const path = require('path');
var router = express.Router();
var db= require('../dao/connectionToDB')

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });


router.post('/:id',upload.single('file'), (req, res)=>{


  console.log(`Start Register personal info of user(${req.params.id})`)
  console.log(req.params.id)
  console.log(req.body)
  let dataQuery = null;
  let values = null
  if(req.file){
    const { filename } = req.file;

     dataQuery = (req.body.id=='')?`
    INSERT INTO personal_info (id_user, firstName, lastName, email, address, phone, city, country, zipCode, filename)
    VALUES (?,?,?,?,?,?,?,?,?,?)
  `: `
    UPDATE personal_info SET id_user= ?, firstName= ?, lastName= ?, email= ?, address= ?, phone= ?, city= ?, country= ?, zipCode=?, filename=?
    WHERE id_user= ${req.body.id}`;
     values = [req.params.id, req.body.firstName, req.body.lastName, req.body.email,req.body.address, req.body.phone, req.body.city, req.body.country, req.body.zipCode, filename]
  }else
  {
     dataQuery = (req.body.id=='')?`
    INSERT INTO personal_info (id_user, firstName, lastName, email, address, phone, city, country, zipCode)
    VALUES (?,?,?,?,?,?,?,?,?)
  `: `
    UPDATE personal_info SET id_user= ?, firstName= ?, lastName= ?, email= ?, address= ?, phone= ?, city= ?, country= ?, zipCode=?
    WHERE id_user= ${req.body.id}`; 
     values = [req.params.id, req.body.firstName, req.body.lastName, req.body.email,req.body.address, req.body.phone, req.body.city, req.body.country, req.body.zipCode]
  }
  db.getConnection().query(dataQuery, values, (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
      } else {
        console.log('Data inserted successfully');
        console.log(`user(${req.params.id}) personal info has been registred`);
        
        (req.body.id=='')?res.redirect('/experience/'+req.params.id):  res.redirect('/experience/display_exp/'+req.params.id) ;
      }
  });
  
})


router.get('/', (req, res)=>{
    console.log(`Start Build cv`)
    const insertDataQuery = `INSERT INTO user () VALUES ()`;
    db.getConnection().query(insertDataQuery, (err, results) => {
        if (err) {
          console.error('Error inserting data:', err);
        } else {
          console.log('Data inserted successfully');
          res.render('personal_info.ejs', {id: results.insertId})
        }
    });
})

router.get('/back/:id', (req, res)=>{
    const selectQuery = `
    select * from personal_info where id_user=${req.params.id}
    `
    db.getConnection().query(selectQuery,(err, rows)=>{
      if (err) {
        console.error('Error  data:', err);
      } else {
        console.log(rows[0])
        res.render('personal_info.ejs', {id: req.params.id, pi:rows[0], filename: rows[0].filename})
      }
    })
  })



module.exports = router;