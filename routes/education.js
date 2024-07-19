var express = require('express')
var router = express.Router();
var db= require('../dao/connectionToDB')

router.post('/:id', (req, res)=>{
  console.log(`Start Register education of user(${req.params.id})`)
  console.log(req.params.id)
  console.log(req.body)
  const dataQuery = (req.body.id=='')? `
    INSERT INTO education (id_user,	schoolName,	city,	country,	degree,	fieldOfStudy,	graduationDate)
    VALUES (?,?,?,?,?,?,?)
  `: `
    UPDATE education SET  id_user= ?,	schoolName= ?,	city= ?,	country= ?,	degree= ?,	fieldOfStudy= ?,	graduationDate= ? 
    WHERE id= ${req.body.id}`;
    const values = [req.params.id, req.body.schoolName,	req.body.city, req.body.country, req.body.degree,	req.body.fieldOfStudy, req.body.graduationDate]
    db.getConnection().query(dataQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data:', err);
        } else {
          console.log('Data inserted successfully');
          console.log(`user(${req.params.id}) education has been registred`)
          res.redirect('display_edt/'+req.params.id)
        }
    });
  
})
router.get('/display_edt/:id', (req, res)=>{
  db.getConnection().query(`select * from education where id_user=${req.params.id}`,(err, rows)=>{
    if (err) {
      console.error('Error  data:', err);
    } else {
      res.render('display_edt.ejs', {id: req.params.id, educations: rows})
    }
  })
})
router.get('/:id', (req, res)=>{
  console.log(req.params.id)
  db.getConnection().query(`select * from education where id_user=${req.params.id}`,(err, rows)=>{
    if (err) {
      console.error('Error  data:', err);
    } else {
      (rows.length==0)?res.render('education.ejs', {id: req.params.id})
      :res.redirect('/education/display_edt/'+req.params.id);
    }
  })
})
router.get('/new/:id', (req, res)=>{
  res.render('education.ejs', {id: req.params.id});
})

router.get('/delete/:id_user/:id', (req, res)=>{
  const deleteQuery = `
   DELETE FROM education WHERE id=${req.params.id}
  `
  db.getConnection().query(deleteQuery,(err, rows)=>{
    if (err) {
      console.error('Error  data:', err);
    } else {
      db.getConnection().query(`select * from education where id_user=${req.params.id}`,(err, rows)=>{
        if (err) {
          console.error('Error  data:', err);
        } else {
          res.redirect('/education/display_edt/'+req.params.id_user)
        }
      })
    }
  })
})

router.get('/edit/:id_user/:id', (req, res)=>{
  const selectQuery = `
  select * from education where id=${req.params.id}
  `
  db.getConnection().query(selectQuery,(err, rows)=>{
    if (err) {
      console.error('Error  data:', err);
    } else {
      console.log(rows[0])
      res.render('education.ejs', {id: req.params.id_user, ed:rows[0]})
    }
  })
})

module.exports = router;