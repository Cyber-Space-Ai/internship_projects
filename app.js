var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect(
'mongodb+srv://salima:n2Dv34yFApQNYmOx@cluster0.d8bcbdk.mongodb.net/?retryWrites=true&w=majority');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/sign_up', function(req,res){
	var name = req.body.name;
	var lastname = req.body.lastname;
	var email =req.body.email;
	var phone =req.body.phone;
    var niveau= req.body.niveau;
	var genre= req.body.genre;
	var durer= req.body.durer;
	var service= req.body.service;
	var age= req.body.age;
	var data = {
		"name": name,
		"lastname":lastname,
		"email":email,
		"phone":phone,
        "niveau":niveau,
		"genre":genre,
		"durer" :durer,
		"service":service,
		"age":age
	}
db.collection('document').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return alert("Successful Registration");
})


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('index.html');
}).listen(3000)


console.log("server listening at port 3000");
