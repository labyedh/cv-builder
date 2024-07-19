var express = require('express')
var router = express.Router();
var db= require('../dao/connectionToDB')


router.post('/:id', (req, res)=>{
  console.log(`Start Register summary of user(${req.params.id})`)
  console.log(req.params.id)
  console.log(req.body)
  const insertDataQuery = `
    INSERT INTO summary (	id_user,	summary)
    VALUES (?,?)
  `;
    const values = [req.params.id, req.body.summary]
    db.getConnection().query(insertDataQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data:', err);
        } else {
          console.log('Data inserted successfully');
          console.log(`user(${req.params.id}) summary has been registred`)
          //res.render('download.ejs', {id: req.params.id})
          res.redirect('/auth/signup/'+req.params.id);
        }
    });
  
})

router.get('/:id', (req, res)=>{
  const selectQuery = `
  select * from summary where id_user=${req.params.id}
  `
  db.getConnection().query(selectQuery,(err, rows)=>{
    if (err) {
      console.error('Error  data:', err);
    } else {
      console.log(rows[0]);
      (rows.length==0)?res.render('summary.ejs', {id: req.params.id}):res.render('summary.ejs', {id: req.params.id, s:rows[0]})
    }
  })
})

module.exports = router;