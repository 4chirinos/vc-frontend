'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:FilterbudgetCtrl
 * @description
 * # FilterbudgetCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
	.controller('FilterbudgetCtrl', function ($scope, $state, $uibModalInstance) {
	    
	    $scope.filter = function() {

  			$uibModalInstance.close(/*params*/);

	        $state.go('main.home.budgetlist', {
	         	code: $scope.code,
	          	firstName: $scope.firstName,
	          	lastName: $scope.lastName,
	          	identityCard: $scope.identityCard
	        });
	        
	    };

  		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

	});
