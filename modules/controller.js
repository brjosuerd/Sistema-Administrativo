angular.module('App',[]);
.controller('usuario', function($scope){
	$scope.nombre


	$scope.formVisibility=false;

	$scope.ShowForm=function(){
		$scope.formVisibility=true;
	}
});



.controller('Menu', function($scope){
	$scope.block = 'reportes';

	$scope.reporte = function(){
		$scope.block = 'reportes';
	}

	$scope.usuario = function(){
		$scope.block = 'register';
	}

	$scope.correo = function(){
		$scope.block = 'correos';
	}
});