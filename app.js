var express = require("express");
var bodyParser = require("body-parser"); //npm install body-parser --save
var User = require("./models/user").User;
var app = express();

app.use(bodyParser.json());//peticiones application/json
app.use(bodyParser.urlencoded({extended:true}));//transferir arreglos objetos[]

app.set("view engine", "jade");

app.get("/",function(req,res){
	res.render("index");
});

app.get("/registro", function(req,res){
	User.find(function(err,doc){
		console.log(doc);
		res.render("registro");
	});
});

app.post("/users",function(req,res){
	var user= new User({email: req.body.email, 
		password: req.body.password,
		password_confirmation:req.body.password_confirmation,
		username:req.body.username
	});

	user.save(function(err){
		if(err){
			console.log(String(err));
		}
		res.send("Guardamos tus datos");	
	});
});

app.listen(3000);