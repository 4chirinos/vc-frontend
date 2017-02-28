'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:AdminbudgetCtrl
 * @description
 * # AdminbudgetCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('AdminbudgetCtrl', function ($scope, $state, $uibModal, response) {

  		$scope.budget = response.data;

  		var updateCost = function() {
    		var cost = 0;
    		for(var i = 0; i < $scope.budget.item.length; i++) {
    			cost += $scope.budget.item[i].cost * $scope.budget.item[i].quantity;
    		}
            cost = cost.toFixed(2);
            cost = parseFloat(cost);
            cost = cost.toLocaleString('de-DE');
            $scope.cost = cost;
    	};
    	
    	$scope.shouldBeActive = function() {
	        return $state.includes("main.home.admin.databudget");
	    };

	    $scope.formattedCost = function(cost) {
            cost = cost.toFixed(2);
            cost = parseFloat(cost);
            cost = cost.toLocaleString('de-DE');
            return cost;
        };

        $scope.edit = function(item, index) {
    		
    		var modalInstance = $uibModal.open({
			    animation: true,
			    templateUrl: 'views/edititemmodal.html',
			    controller: 'EdititemmodalCtrl',
			    size: 'lg',
			    resolve: {
			    	data: function() {
			    		return angular.copy(item);
			    	}
			    }
		    });

		    modalInstance.result.then(function(it) {
                arr[index] = true;
                $scope.currentBudget.item[index] = it;
                updateCost();
		    	/*$rootScope.statusGroups = it.statusGroups;
		  		$scope.budget.item[index] = it;
		  		updateCost();*/
		  		//toastr.success('Cambio hecho con éxito.', 'Listo');
			}, function() {
			   	console.log('Modal dismissed at: ' + new Date());
			});

    	};

        updateCost();

  	});
