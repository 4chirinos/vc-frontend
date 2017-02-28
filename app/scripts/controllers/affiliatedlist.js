'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:AffiliatedlistCtrl
 * @description
 * # AffiliatedlistCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('AffiliatedlistCtrl', function ($scope, $state, response, affiliated) {

  		var pageSize = 6;
	    $scope.selectedPage = 0;
    	
    	if(response.status == 500) {
			toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
		} else {
			$scope.affiliateds = response.data.affiliateds;
			$scope.pages = response.data.pageCount;
			console.log($scope.affiliateds);
		}

		var getAffliated = function(page) {

    		var params = {
				page: page,
				pageSize: pageSize
			};

	  		affiliated.getAll(params).then(function(response) {
	    		$scope.affiliateds = response.data.affiliateds;
	    		$scope.pages = response.data.pageCount;
		  	}, function(response) {
		  		if(response.status == 500) {
		        	toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
		        }
		  	});
	  	};

	  	$scope.pageSelected = function(index) {
	    	$scope.selectedPage = index;
	    	getAffliated($scope.selectedPage + 1);
	    };

	    $scope.previousPage = function() {
	    	if($scope.selectedPage - 1 >= 0) {
	    		$scope.selectedPage--;
	    		getAffliated($scope.selectedPage + 1);
	    	}
	    	else {
	    		console.log('extremo izquierdo');
	    	}
	    };

	    $scope.nextPage = function() {
	    	if($scope.selectedPage + 1 < $scope.pages) {
	    		$scope.selectedPage++;
	    		getAffliated($scope.selectedPage + 1);
	    	}
	    	else {
	    		console.log('extremo derecho');
	    	}
	    };

	    $scope.detail = function(id) {
	    	$state.go(
		        'main.home.affiliateddetail', {
		    		id: id
		    	}    
		    );
	    };

  	});
