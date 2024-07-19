var express = require('express')
var router = express.Router();
var db= require('../dao/connectionToDB')



router.get('/:id', (req, res)=>{

  db.getConnection().query("select * from personal_info where id_user="+req.params.id, (err, rowsPI) => {
    if (err) {
      console.error('Error  data:', err);
    } else {
      db.getConnection().query("select * from experience where id_user="+req.params.id, (err, rowsEXP) => {
        if (err) {
          console.error('Error  data:', err);
        } else {
          db.getConnection().query("select * from education where id_user="+req.params.id, (err, rowsEDT) => {
            if (err) {
              console.error('Error  data:', err);
            } else {
              db.getConnection().query("select * from skill where id_user="+req.params.id, (err, rowsSKILLS) => {
                if (err) {
                  console.error('Error  data:', err);
                } else {
                  const map = {1: 'Beginner' ,2: 'Professional', 3: 'Expert'};
                  for(let i=0; i< rowsSKILLS.length; i++)
                  rowsSKILLS[i].level = map[rowsSKILLS[i].level]
                  db.getConnection().query("select * from summary where id_user="+req.params.id, (err, rowsSummary) => {
                    if (err) {
                      console.error('Error  data:', err);
                    } else {
                      let cv={
                        personalInfo: rowsPI[0],
                        experiences: rowsEXP,
                        educations: rowsEDT,
                        skills: rowsSKILLS,
                        summary: rowsSummary[0]
                      }
                      res.render('download.ejs', {id: req.params.id, cv: cv});
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
  
})


module.exports = router;