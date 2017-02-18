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
	        {entity: 'Persona', entityId: 2},
	        {entity: 'Carta Aval', entityId: 3},
	        {entity: 'Presupuesto', entityId: 4}
	    ];

	    $scope.fileUpload = function(){
            angular.element('#upload1').trigger('click');
        };

        $scope.fileLoaded = function(file) {
        	console.log(file);
            $scope.$apply(function() {
                $scope.file = file;
            });
        };

        $scope.disabled = function() {
        	return $scope.entity != 1 && angular.isDefined($scope.file);
        };

        $scope.loadFile = function() {
        	dbfiles.postFile($scope.entity, $scope.file).then(function(response) {
        		console.log(response);
        	}, function(response) {
        		console.log(response);
        	});
        };

  	});
