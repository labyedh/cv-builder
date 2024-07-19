var express = require('express')
var router = express.Router();
var db= require('../dao/connectionToDB')


router.post('/signup/:id', (req, res)=>{
  console.log(`Start Register user(${req.params.id})`)
  console.log(req.params.id)
  console.log(req.body)
  if(req.body.password!=req.body.repeatPassword)
   res.redirect('/auth/signup/'+req.params.id);
  const dataQuery = `
  UPDATE user SET  username=?, password=?
  WHERE id= ${req.params.id}` ;
    const values = [req.body.username, req.body.password]
    db.getConnection().query(dataQuery, values, (err, results) => {
        if (err) {
          console.error('Error inserting data:', err);
        } else {
          console.log('User inserted successfully');
          res.redirect('/download/'+ req.params.id)
        }
    });
  
})

router.post('/signin/:id', (req, res)=>{
  console.log(`Start sign in user(${req.params.id})`)
  console.log(req.params.id)
  console.log(req.body)
  
  db.getConnection().query("select * from user where username=?",req.body.username, (err, rows) => {
      if (err) {
        console.error('Error data:', err);
      } else {
        console.log('User selected successfully');
        if(rows[0].username!=req.body.username || rows[0].password!=req.body.password){
          res.redirect('/auth/signin/'+req.params.id)
        }
          
        
        if(req.params.id!=-1)
          res.redirect('/download/'+ req.params.id)
        else
          res.redirect('/personal_info/back/'+rows[0].id)
      }
  });
  
})

router.get('/signup/:id', (req, res)=>{
  res.render('signup.ejs', {id: req.params.id});
})

router.get('/signin/:id', (req, res)=>{
  res.render('signin.ejs', {id: req.params.id});
})

module.exports = router;