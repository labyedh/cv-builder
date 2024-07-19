var express = require('express')
var router = express.Router();
var db= require('../dao/connectionToDB')

router.post('/:id', (req, res)=>{
  console.log(`Start Register experience of user(${req.params.id})`)
  console.log(req.params.id)
  console.log(req.body)
  
  const dataQuery = (req.body.id=='')?`
    INSERT INTO experience (id_user,	employer,	jobTitle,	city,	country,	startDate,	endDate	,jobDescription)
    VALUES (?,?,?,?,?,?,?,?)
  `:`
    UPDATE experience SET  id_user= ?,	employer= ?,	jobTitle= ?,	city=?,	country=?,	startDate=?,	endDate=?	,jobDescription=?
    WHERE id= ${req.body.id}` ;
    const values = [req.params.id,	req.body.employer,	req.body.jobTitle,	req.body.city,	req.body.country,	req.body.startDate,	req.body.endDate	,req.body.jobDescription]
    db.getConnection().query(dataQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data:', err);
        } else {
          console.log('Data inserted successfully');
          console.log(`user(${req.params.id}) experience has been registred`)
          res.redirect('display_exp/'+req.params.id)
          
        }
    });
  
})

router.get('/display_exp/:id', (req, res)=>{
  db.getConnection().query(`select * from experience where id_user=${req.params.id}`,(err, rows)=>{
    if (err) {
      console.error('Error inserting data:', err);
    } else {
      res.render('display_exp.ejs', {id: req.params.id, experiences: rows})
    }
  })
})

router.get('/:id', (req, res)=>{
  res.render('experience.ejs', {id: req.params.id})
})

router.get('/delete/:id_user/:id', (req, res)=>{
  const deleteQuery = `
   DELETE FROM experience WHERE id=${req.params.id}
  `
  db.getConnection().query(deleteQuery,(err, rows)=>{
    if (err) {
      console.error('Error  data:', err);
    } else {
      db.getConnection().query(`select * from experience where id_user=${req.params.id}`,(err, rows)=>{
        if (err) {
          console.error('Error  data:', err);
        } else {
          res.redirect('/experience/display_exp/'+req.params.id_user)
        }
      })
    }
  })
})

router.get('/edit/:id_user/:id', (req, res)=>{
  const selectQuery = `
  select * from experience where id=${req.params.id}
  `
  db.getConnection().query(selectQuery,(err, rows)=>{
    if (err) {
      console.error('Error  data:', err);
    } else {
      console.log(rows[0])
      res.render('experience.ejs', {id: req.params.id_user, exp:rows[0]})
    }
  })
})

router.get('/education/:id', (req, res)=>{
  res.render('education.ejs', {id: req.params.id})
})
module.exports = router;