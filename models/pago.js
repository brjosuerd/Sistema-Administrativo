var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var pago_schema = new Schema({
	mes: String,
	matricula: String
});

var Pago = mongoose.model("Pago",pago_schema);