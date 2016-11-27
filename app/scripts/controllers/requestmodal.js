'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:RequestmodalCtrl
 * @description
 * # RequestmodalCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
	.controller('RequestmodalCtrl', function ($scope, $uibModalInstance) {
    	
		$scope.open1 = function() {
    		$scope.popup1.opened = true;
  		};

  		$scope.popup1 = {
    		opened: false
  		};

  		$scope.dateOptions = {
	        formatYear: 'yyyy',
	        startingDay: 1,
	        minDate: new Date()
	    };

	    $scope.validDate = function() {
	    	return ($scope.dt1 instanceof Date);
	    };

	    var formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  		
  		$scope.format = formats[0];

  		$scope.ok = function() {
  			$uibModalInstance.close({comment: $scope.coment, date: $scope.dt1});
  		};

  		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

  	});
