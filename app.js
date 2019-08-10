var express= require('express');
var todoController=require('./controllers/todoController');

//set up my app by using express
var app=express();

//set up the template engine
app.set('view engine','ejs');

//set static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to port
app.listen(3000);

console.log('u are listening to port 3000');

