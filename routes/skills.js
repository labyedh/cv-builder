var express = require('express')
var router = express.Router();
var db= require('../dao/connectionToDB')

router.post('/:id', (req, res)=>{
  console.log(`Start Register skill of user(${req.params.id})`)
  console.log(req.params.id)
  console.log(req.body)
  const insertDataQuery = `
    INSERT INTO skill (id_user, skill, level)
    VALUES (?,?,?)
  `;
  const deleteQuery = `
   DELETE FROM skill WHERE id_user=${req.params.id}
  `
  db.getConnection().query(deleteQuery,(err, rows)=>{
    if (err) {
      console.error('Error  data:', err);
    } else {
      for(let i=0; i<=req.body.skills_id; i++){
        db.getConnection().query(insertDataQuery, [req.params.id, req.body['skill_'+i],req.body['level_'+i]], (err, results) => {
          if (err) {
            console.error('Error inserting data:', err);
          } else {
            console.log('Data inserted successfully');
            console.log(`user(${req.params.id}) skill has been registred`);
          }
        });
      }
      res.redirect('/summary/'+req.params.id)
    }
  })
  
})

router.get('/:id', (req, res)=>{
  db.getConnection().query(`select * from skill where id_user=${req.params.id}`,(err, rows)=>{
    if (err) {
      console.error('Error  data:', err);
    } else {
      if (rows.length==0){
        res.render('skill.ejs', {id: req.params.id, skills: [{skill: '', level: '2'}]});
      }else{
        console.log(rows);
        res.render('skill.ejs', {id: req.params.id, skills: rows});
      }
        
    }
  })
})
module.exports = router;