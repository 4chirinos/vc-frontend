'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:GuaranteelistCtrl
 * @description
 * # GuaranteelistCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
	.controller('GuaranteelistCtrl', function ($scope, $rootScope, $stateParams, $state, toastr, session, guaranteeletter, response) {

		var pageSize = 6;
	    $scope.selectedPage = 0;

	    $scope.user = session.getCurrentUser();

		if(response.status == 500) {
			toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
		} else {
			$scope.guarantees = response.data.guaranteeLetter;
			$scope.pages = response.data.pageCount;
		}

		var getGuarantee = function(page) {

    		var params = {
    			page: page,
    			pageSize: pageSize,
    			status: $stateParams.status,
			  	guaranteeId: $stateParams.guaranteeId,
			  	firstName: $stateParams.firstName,
			  	lastName: $stateParams.lastName,
			  	BidentityCard: $stateParams.BidentityCard
    		};

	  		guaranteeletter.getGuaranteeQS(params).then(function(response) {
	  			$scope.guarantees = response.data.guaranteeLetter;
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
	    	getGuarantee($scope.selectedPage + 1);
	    };

	    $scope.previousPage = function() {
	    	if($scope.selectedPage - 1 >= 0) {
	    		$scope.selectedPage--;
	    		getGuarantee($scope.selectedPage + 1);
	    	}
	    	else {
	    		console.log('extremo izquierdo');
	    	}
	    };

	    $scope.nextPage = function() {
	    	if($scope.selectedPage + 1 < $scope.pages) {
	    		$scope.selectedPage++;
	    		getGuarantee($scope.selectedPage + 1);
	    	}
	    	else {
	    		console.log('extremo derecho');
	    	}
	    };

	    $scope.statusColor = function(guarantee) {
	    	var startDate = guarantee.startDate.split('T')[0].split('-'),
	    		endDate = guarantee.endDate.split('T')[0].split('-');

	    	if(startDate[0] > endDate[0]) return 'label-danger';
	    	if(startDate[1] > endDate[1]) return 'label-danger';
	    	if(startDate[2] > endDate[2]) return 'label-danger';

	      	return 'label-success';
	    };

	    $scope.statusText = function(guarantee) {
	    	var startDate = guarantee.startDate.split('T')[0].split('-'),
	    		endDate = guarantee.endDate.split('T')[0].split('-');

	    	if(startDate[0] > endDate[0]) return 'vencida';
	    	if(startDate[1] > endDate[1]) return 'venvida';
	    	if(startDate[2] > endDate[2]) return 'vencida';

	      	return guarantee.status.status;
	    };

		$scope.detail = function(id) {
	    	$state.go(
		        'main.home.guaranteeletterdetail', {
		    		id: id
		    	}    
		    );
	    };   

  	});
