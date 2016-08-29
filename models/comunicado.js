var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var comunicado_schema = new Schema({
	titulo: String,
	fecha: Date,
	mensaje: String,
	emisor: String,
	receptor: String,
});

var Comunicado = mongoose.model("Comunicado",comunicado_schema);

module.exports.Comunicado = Comunicado;