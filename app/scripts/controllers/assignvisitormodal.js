'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:AssignvisitormodalCtrl
 * @description
 * # AssignvisitormodalCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('AssignvisitormodalCtrl', function ($rootScope, $scope, $uibModalInstance, data, user) {

  		var pageSize = 10;

	    $scope.selectedPage = 0;
	    $scope.visitors = data.users;
	    $scope.pages = data.pageCount;

	    var getVisitors = function(page) {
	  		user.getVisitors(page, pageSize).then(function(response) {
	    		$scope.visitors = response.data.users;
	    		$scope.pages = response.data.pageCount;
	    		$rootScope.statusGroups = response.data.statusGroups;
		  	}, function(response) {
		  		if(response.status == 500) {
	          		toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
	        	}
		  	});
	  	};

	  	$scope.pageSelected = function(index) {
	    	$scope.selectedPage = index;
	    	getVisitors($scope.selectedPage + 1);
	    };

	    $scope.previousPage = function() {
	    	if($scope.selectedPage - 1 >= 0) {
	    		$scope.selectedPage--;
	    		getVisitors($scope.selectedPage + 1);
	    	}
	    	else {
	    		console.log('extremo izquierdo');
	    	}
	    };

		$scope.nextPage = function() {
	    	if($scope.selectedPage + 1 < $scope.pages) {
	    		$scope.selectedPage++;
	    		getVisitors($scope.selectedPage + 1);
	    	}
	    	else {
	    		console.log('extremo derecho');
	    	}
	    };

	    $scope.assign = function(visitor) {
	    	$uibModalInstance.close(visitor);
	    };


		/*$scope.ok = function () {
			$uibModalInstance.close($scope.selected.item);
		};*/

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

  	});
