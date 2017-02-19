'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:LoaddbfilesCtrl
 * @description
 * # LoaddbfilesCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('LoaddbfilesCtrl', function ($scope, dbfiles, toastr) {

    	$scope.entity = 1;

    	$scope.entities = [
	        {entity: '-- Seleccionar Entidad --', entityId: 1},
            {entity: 'Clínica', entityId: 7},
	        {entity: 'Persona', entityId: 2},
	        {entity: 'Póliza', entityId: 6},
	        {entity: 'Presupuesto', entityId: 4},
	        {entity: 'Gastos de Presupuesto', entityId: 5},
	        {entity: 'Carta Aval', entityId: 3}
	    ];

	    $scope.fileUpload = function(){
            angular.element('#upload1').trigger('click');
        };

        $scope.fileLoaded = function(file) {
            $scope.$apply(function() {
                $scope.file = file;
            });
        };

        $scope.disabled = function() {
        	return $scope.entity != 1 && angular.isDefined($scope.file) && $scope.file != null;
        };

        $scope.loadFile = function() {
        	dbfiles.postFile($scope.entity, $scope.file).then(function(response) {
        		$scope.file = null;
        		toastr.success('Datos cargados con éxito.', 'Listo');
        	}, function(response) {
        		toastr.error('Ocurrió un error en la carga. Intente de nuevo.', 'Error');
        	});
        };

  	});
