var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var evento_schema = new Schema({
	nombre: String,
	fecha: String,
	descripcion: String,
	emisor: String,
	tipo: String
});

var Evento = mongoose.model("Evento",evento_schema);

module.exports.Evento = Evento;