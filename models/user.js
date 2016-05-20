var mongoose = require("mongoose");  //npm install mongoose --save
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos");

var posibles_valores=["M","F"];
var email_match =[/^\w+([.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Correo no válido"]
var password_validation = {
	validator:function(P){
		return this.password_confirmation==P;
	},
	message:"Las contraseñas no son iguales"
}

var user_schema= new Schema({
	name:String,
	username:{type:String,required:true,maxlength:[50,"Nombre muy grande"]},
	password:{type:String,required:true,minlength:[3,"password muy corto"],validate:password_validation},
	age:{type:Number,min:[5,"Edad minima 5"],max:[5,"Edad maxima 100"]},
	email:{type:String,required:"El correo es obligatorio",match:email_match},
	date_of_birth:Date,
	sex:{type:String,enum:{values:posibles_valores,message:"Opcion no valida, solo puede ser M y F"}}
});

user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c=password;
});

//Si no existe la coleccion se crea una en el plural del modelo
//crear esquema estructura de la tabla o documento
//crear un modelo coneccion con la db
var User = mongoose.model("User", user_schema)

module.exports.User=User;

/* Tipos de Datos
String
Number
Date
Buffer
Boolean
Mixed
Objectid
Array
*/