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
        	{rol: 'Analista', rolId: '7'},
        	{rol: 'Coordinador', rolId: '8'},
        	{rol: 'Visitador', rolId: '9'},
        	{rol: 'Administrador', rolId: '6'}
      	];

    	$scope.ok = function () {
			$uibModalInstance.close();
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

  	});
