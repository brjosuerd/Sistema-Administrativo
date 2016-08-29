var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var correo_schema = new Schema({
	asunto: String,
	fecha: Date,
	mensaje: String,
	emisor: String,
	receptor: String,
	tipo: String
});

var Correo = mongoose.model("Correo",correo_schema);

module.exports.Correo = Correo;