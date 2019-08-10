var bodyParser=require('body-parser');
var mongoose=require('mongoose');

//connect to the database
mongoose.connect('mongodb+srv://caowei1:caowei1992@cluster0-gf1ld.mongodb.net/test?retryWrites=true&w=majority'
,{useNewUrlParser: true });
//create a schema -this is like a blueprint
var todoSchema=new mongoose.Schema({
    //just one property
    item:String
});

//create our model
//'Todo' is a collection name stored in mongodb
//now I have create a model type of todo which is based on the todoSchema
//To use our schema definition, we need to convert our todoSchema into a Model we can work with
var Todo=mongoose.model('Todo',todoSchema);
//create items and push them into database
//dummy data
// var item1=Todo({item:'get food'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved')
// });


//create some dummy data
//var data=[{item:'eat food'},{item:'meet friend'},{item:'do some sports'}];
var urlencodedParser=bodyParser.urlencoded({extended:false});

module.exports=function(app){
//set up all of my request handlers
//rendering some views and pass some data to views in this controller for the todo list

    //get request
    app.get('/todo',function(req,res){
        //get data from mongodb and pass it to view
        //render a view,data will pass through the view in todos item(property name)
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos:data});
        });      
    });

    app.post('/todo',urlencodedParser,function(req,res){
        //get data from the view and add it to mongodb
        var newTodo=Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        });
        //data.push(req.body);
    });

    //
    app.delete('/todo/:item',function(req,res){
        //delete requested item from mongodb    / /means regular expression, \-means Escape character
        Todo.find({item:req.params.item.replace(/\-/g," ")}).deleteOne(function(err,data){
            if(err) throw err;
            res.json(data);
        });
        // data=data.filter(function(todo){
        //     //return true or false;if true, item remain in an array;if false, filter that item out of the array
        //     return todo.item.replace(/ /g, '-') !==req.params.item;
        // });
        // res.json(data);
    });

};