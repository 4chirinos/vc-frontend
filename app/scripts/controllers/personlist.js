'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:PersonlistCtrl
 * @description
 * # PersonlistCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('PersonlistCtrl', function ($scope, $stateParams, $state, toastr, person, response) {
    	
    	var pageSize = 6;
    	$scope.selectedPage = 0;
    	$scope.pages = 0;

    	if(response.status == 500) {
    		toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
    	} else {
    		$scope.persons = response.data.persons;
	    	$scope.pages = response.data.pageCount;
    	}

    	var getPerson = function(page) {

    		var params = {
				identityCard: $stateParams.identityCard,
				firstName: $stateParams.firstName,
				lastName: $stateParams.lastName,
				profileId: $stateParams.profileId,
				stateId: $stateParams.stateId,
				page: page,
				pageSize: pageSize
			};

	  		person.getPersonQS(params).then(function(response) {
	    		$scope.persons = response.data.persons;
	    		$scope.pages = response.data.pageCount;
		  	}, function(response) {
		  		if(response.status == 500) {
		        	toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
		        }
		  	});
	  	};

    	$scope.pageSelected = function(index) {
	    	$scope.selectedPage = index;
	    	getPerson($scope.selectedPage + 1);
	    };

	    $scope.previousPage = function() {
	    	if($scope.selectedPage - 1 >= 0) {
	    		$scope.selectedPage--;
	    		getPerson($scope.selectedPage + 1);
	    	}
	    	else {
	    		console.log('extremo izquierdo');
	    	}
	    };

	    $scope.nextPage = function() {
	    	if($scope.selectedPage + 1 < $scope.pages) {
	    		$scope.selectedPage++;
	    		getPerson($scope.selectedPage + 1);
	    	}
	    	else {
	    		console.log('extremo derecho');
	    	}
	    };

	    $scope.detail = function(id) {
	    	$state.go(
		        'main.home.persondetail', {
		    		id: id
		    	}    
		    );
	    };

  	});
