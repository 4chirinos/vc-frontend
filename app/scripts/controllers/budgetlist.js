'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:BudgetlistCtrl
 * @description
 * # BudgetlistCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('BudgetlistCtrl', function ($scope, $state, budget, response) {
    	
  		var pageSize = 6;
  		$scope.pageSize = 6;
	    $scope.selectedPage = 0;
    	
    	if(response.status == 500) {
			toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
		} else {
			$scope.budgets = response.data.budgets;
			$scope.pages = response.data.pageCount;
		}

		var getBudget= function(page) {

    		var params = {
				page: page,
				pageSize: pageSize
			};

	  		budget.getAll(params).then(function(response) {
	    		$scope.budgets = response.data.budgets;
	    		$scope.pages = response.data.pageCount;
		  	}, function(response) {
		  		if(response.status == 500) {
		        	toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
		        }
		  	});
	  	};

		$scope.pageSelected = function(index) {
	    	$scope.selectedPage = index;
	    	getBudget($scope.selectedPage + 1);
	    };

	    $scope.previousPage = function() {
	    	if($scope.selectedPage - 1 >= 0) {
	    		$scope.selectedPage--;
	    		getBudget($scope.selectedPage + 1);
	    	}
	    	else {
	    		console.log('extremo izquierdo');
	    	}
	    };

	    $scope.nextPage = function() {
	    	if($scope.selectedPage + 1 < $scope.pages) {
	    		$scope.selectedPage++;
	    		getBudget($scope.selectedPage + 1);
	    	}
	    	else {
	    		console.log('extremo derecho');
	    	}
	    };

	    $scope.detail = function(id) {
	    	$state.go(
		        'main.home.admin.infobudget', {
		    		id: id
		    	}    
		    );

		    /*$state.go(
		        'main.home.loaddata.budget.originalbudget', {
		    		id: id
		    	}    
		    );*/
	    };

  	});
