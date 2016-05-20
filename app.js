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
	res.render("registro");
});

app.post("/addusr",function(req,res){
	var user= new User({email: req.body.email, 
		password: req.body.password,
		password_confirmation:req.body.password_confirmation,
		username:req.body.username
	});
	/*Save call back
	user.save(function(err){
		if(err){
			res.send(String(err));	
		}else{
			res.send("Guardamos tus datos");	
		}
	});
	*/
	//Save Promises
	user.save().then(function(us){
		res.send("Se guardo el usuario");
	}, function(err){
		res.send(String(err));
	});
});

app.get("/login",function(req,res){
	User.find(function(err,doc){
		res.send(doc);
	});	
});

app.post("/login",function(req,res){
	User.findOne({email: req.body.username, password:req.body.password},function(err,doc){
		//console.log(doc);
		if (!doc){
			res.send("nombre de usuario o contraseña incorrecta");
		}else{
			var count= Object.keys(doc).length;
			res.send("Hola " + doc.username+ " has iniciado sesión");
		}
	});	
});



app.listen(3000);