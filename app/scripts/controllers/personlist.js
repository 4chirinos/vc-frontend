'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:PersonlistCtrl
 * @description
 * # PersonlistCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('PersonlistCtrl', function ($scope, $stateParams, $state, toastr, $uibModal, person, response) {
    	
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

	  	$scope.filter = function() {

        	//$stateParams.filter = '';
        	
        	var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'views/filterperson.html',
				controller: 'FilterpersonCtrl',
				size: 'sm'
			});

			modalInstance.result.then(function(/*r*/) {
				/*$scope.params = r.params;
				$stateParams.filter = '';
				$scope.selectedPage = 0;
				$scope.requests = r.response.data.requests;
		    	$scope.pages = r.response.data.pageCount;
		    	$rootScope.statusGroups = r.response.data.statusGroups;*/
			}, function() {
				console.log('Modal dismissed at: ' + new Date());
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
