var mongoose = require("mongoose");  //npm install mongoose --save
var Schema = mongoose.Schema;
//Colecciones => bases de datos, Modelos=> tablas
//Esquema => columnas, Documentos => filas

mongoose.connect("mongodb://localhost/fotos");

var user_schema= new Schema({
	name:String,
	username:String,
	password:String,
	age:Number,
	email:String,
	date_of_birth:Date
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