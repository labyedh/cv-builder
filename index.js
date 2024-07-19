var express= require('express');
var bodyParser = require('body-parser')
const path = require('path');

var app = express();
var urlencoded = bodyParser.urlencoded({extended: false})

app.use(urlencoded)
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('engine view', 'ejs');

var db= require('./dao/connectionToDB')
db.startConnection();

let personal_info = require('./routes/personal_info')
app.use('/personal_info', personal_info)
let experience = require('./routes/experience')
app.use('/experience', experience)
let education = require('./routes/education')
app.use('/education', education)
let skill = require('./routes/skills')
app.use('/skill', skill)
let summary = require('./routes/summary')
app.use('/summary', summary)
let auth = require('./routes/auth')
app.use('/auth', auth)
let download = require('./routes/download')
app.use('/download', download)

app.get('/', (req, res)=>{
    
    res.render('home.ejs')
})

app.listen(8085, ()=>console.log('Server listning on port 8085!...'))