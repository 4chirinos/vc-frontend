'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:CreateusermodalCtrl
 * @description
 * # CreateusermodalCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('CreateusermodalCtrl', function ($scope, $uibModalInstance) {

  		$scope.roles = [
        {rol: '-- Seleccionar rol --', rolId: ''},
        {rol: 'Analista', rolId: '7'},
        {rol: 'Coordinador', rolId: '8'},
        {rol: 'Visitador', rolId: '9'},
        {rol: 'Administrador', rolId: '6'}
      ];

      $scope.rol = '';

    	$scope.ok = function () {
  			$uibModalInstance.close({profileId: $scope.rol});
  		};

  		$scope.cancel = function () {
  			$uibModalInstance.dismiss('cancel');
  		};

  	});
