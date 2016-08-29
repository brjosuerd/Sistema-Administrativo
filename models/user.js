var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/unedlweb");

var valores = ["administrador", "administrativo", "docente", "alumno"];
var correoMatch = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, "Ingresa email valido"];

var user_schema = new Schema({
	nombre: String,
	apellido: String,
	edad: {type: Number, min:[16, "La edad debe ser mayor a 16"], max:[100, "La edad debe ser menor a 100"]},
	email: {type: String, required: "El correo es obligatorio", match: correoMatch},
	username: {type: String, required: true, maxlength:[50, "El username es muy largo"]},
	password: {type: String, minlength: [8, "El password es muy corto"]},
	tipoUsuario: {type: String, enum: valores},
	ultimaConexion: Date,
	informacion: {
		matricula: String,
		direccion: String,
		semestre: Number
	},
	pagos: [{type: Schema.ObjectId, ref: "Pago"}],
	materias: [{ type: Schema.ObjectId, ref: "Materia"}]
});

user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c = password;
});

var User = mongoose.model("User",user_schema);

module.exports.User = User;