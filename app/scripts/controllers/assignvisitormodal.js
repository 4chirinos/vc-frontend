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
	  			$scope.visitor = null;
	    		$scope.visitors = response.data.users;
	    		console.log($scope.visitors.length);
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


		$scope.ok = function () {
			//onsole.log($scope.coment);
			$uibModalInstance.close({visitor: $scope.visitor, coment: $scope.coment});
		};

		$scope.canAssign = function() {
			if($scope.visitor) return false;
			return true;
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

  	});
