var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user').User;
var Comunicado = require('../models/comunicado').Comunicado;
var Evento = require('../models/eventos').Evento;
var Pago = require('../models/pago').Pago;
var Correo = require('../models/correo').Correo;
var router = express.Router();


//PAGINA DE INICIO
router.get('/', function(req, res) {
  res.render('login');
});

router.post('/session', function(req, res){
 	User.findOne({username: req.body.username, password: req.body.password},function(err, user){
 		if(user.tipoUsuario == 'administrador'){
 			res.redirect('/admin');
 		}
 		else if(user.tipoUsuario == 'administrativo'){
 			res.redirect('/adtvo');
 		}else if(user.tipoUsuario == 'docente'){
 			res.redirect('/docente');
 		}
 	});
});

router.get('/admin', function(req, res) {
	res.render('adminLogo');
});

router.get('/admin/reportes', function(req, res){
	User.find(function(err, users) {
		res.render('reportes', {users, users});
    });
});

router.get('/admin/usuarios', function(req, res) {
	User.find(function(err, users) {
		res.render('registro', {users, users});
    });
	
});

router.post('/admin/usuarios', function(req, res){
	var usuario = new User({
		nombres: req.body.nombre,
		apellidos: req.body.apellido,
		edad: req.body.edad,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		tipoUsuario: req.body.tipoUsuario
	});
	usuario.save().then(function(us){
		console.log("ok");
	}, function(err){
		if(err){
			console.log(String(err));
		}
	});
});

router.get('/admin/correo', function(req, res){
	Correo.find({receptor: 'josue@hotmail.com'}, function(err, correos){
		res.render('correo', {correos, correos});
	});
});

router.get('/admin/salir', function(req, res){
	res.redirect('/');
});

//USUARIO ADMINISTRATIVO
router.get('/adtvo', function(req, res) {	
	res.render('adtvoLogo');
});

router.get('/adtvo/reportes', function(req, res){
	Pago.find(function(err, pagos){
		console.log(pagos);
		res.render('menuReportes', {pagos, pagos});
	});
});

router.get('/adtvo/docentes', function(req, res){
	User.find({tipoUsuario: 'docente'}, function(err, docentes){
		res.render('menuDocentes', {docentes, docentes});
	});
});

router.post('/adtvo/docentes', function(req, res){
	var usuario = new User({
		nombre: req.body.nombres,
		apellido: req.body.apellidos,
		edad: req.body.edad,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		tipoUsuario: "docente"
	});
	usuario.save().then(function(us){
		console.log("ok");
	}, function(err){
		if(err){
			console.log(String(err));
		}
	});
});

router.get('/adtvo/alumnos', function(req, res){
	User.find({tipoUsuario: 'alumno'}, function(err, alumnos) {
		res.render('menuAlumnos', {alumnos, alumnos});
    });
});

router.post('/adtvo/alumnos', function(req, res){
	var usuario = new User({
		nombres: req.body.nombres,
		apellidos: req.body.apellidos,
		edad: req.body.edad,
		email: req.body.email,
		matricula: req.body.matricula,
		username: req.body.username,
		direccion: req.body.direccion,
		tipoUsuario: "alumno"
	});
	usuario.save().then(function(us){
		console.log("ok");
	}, function(err){
		if(err){
			console.log(String(err));
		}
	});
});

router.get('/adtvo/correo', function(req, res){
	Correo.find({receptor: 'jramirez@gmail.com'}, function(err, correos){
		res.render('menuCorreo', {correos, correos});
	});
});

router.post('/adtvo/correo', function(req, res){
	var correo = new Correo({
		asunto: req.body.asunto,
		mensaje: req.body.mensaje,
		receptor: req.body.receptor,
		tipo: correo
	});
	correo.save().then(function(us){
		console.log("ok");
	}, function(err){
		if(err){
			console.log(String(err));
		}
	});
});

router.get('/adtvo/eventos', function(req, res){
	res.render('menuEventos');
});

router.post('/adtvo/eventos', function(req, res){
	var evento = new Evento({
		nombre: req.body.evento,
		fecha: fecha,
		descripcion: req.body.descripcion,
		tipo: 'evento'
	});
	evento.save().then(function(us){
		console.log("ok");
	}, function(err){
		if(err){
			console.log(String(err));
		}
	});
});

router.get('/adtvo/comunicados', function(req, res){
	Comunicado.find(function(err, comunicados){
		res.render('menuComunicados', {comunicados, comunicados});
	});	
});

router.post('/adtvo/comunicados', function(req, res){
	var date = new Date();
	var comunicado = new Comunicado({
		titulo: req.body.titulo,
		fecha: date,
		mensaje: req.body.mensaje,
		tipo: comunicado
	});
	comunicado.save().then(function(us){
		console.log("ok");
	}, function(err){
		if(err){
			console.log(String(err));
		}
	});
});

router.get('/adtvo/salir', function(req, res){
	res.redirect('/');
});

//USUARIO DOCENTE
router.get('/docente', function(req, res) {
	res.render('docenteLogo');
});

router.get('/docente/correo', function(req, res){
	Correo.find({receptor: 'miguel@hotmail.com'}, function(err, correos){
		res.render('menuCorreoDocente', {correos, correos});
	});
});

router.get('/docente/comunicados', function(req, res){
	Comunicado.find(function(err, comunicados){
		res.render('menuComunicadosDocente', {comunicados, comunicados});
	});
});

router.get('/docente/eventos', function(req, res){
	res.render('menuEventosDocente');
});

router.get('/docente/horarios', function(req, res){
	res.render('menuHorarios');
});

router.get('/docente/salir', function(req, res){
	res.redirect('/');
});

router.get('/register', function(req, res){
	res.render('registro', {message: req.flash('message')});
});

router.get('/adtvo/pago', function(req, res){
	res.render('pagos');
});

router.post('/adtvo/pago', function(req, res) {
  var keys = require('./public/javascripts/keys.json'),
    conekta = require('conekta');
  conekta.api_key = keys.private_key;
  conekta.Charge.create(req.body, function(err, charge) {
    if (err) {
      return res.render('charge', {
        charge: err
      });
    }
    res.render('charge', {
      charge: charge.toObject()
    });
  });
});


module.exports = router;
