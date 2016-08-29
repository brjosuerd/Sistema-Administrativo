var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var materia_schema = new Schema({
	nombre: String,
	horario: String
	maestro: { type: Schema.ObjectId, ref: "User"}
});
	
var Materia = mongoose.model("Materia",materia_schema);