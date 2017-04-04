'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:ConfirmationCtrl
 * @description
 * # ConfirmationCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('ConfirmationCtrl', function ($scope, $uibModalInstance, data) {

  		$scope.data = data;

  		$scope.ok = function() {
        	$uibModalInstance.close(true);
	    };

  		$scope.cancel = function () {
  			$uibModalInstance.dismiss(false);
  		};

  	});