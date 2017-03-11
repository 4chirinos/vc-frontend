'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:AdminbudgetCtrl
 * @description
 * # AdminbudgetCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('AdminbudgetCtrl', function ($scope, $state, $uibModal, toastr, response, budget) {

  		$scope.budget = response.data;

        var arr = [];

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

        $scope.edited = function(index) {
            return arr[index];
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
                $scope.budget.item[index] = it;
                updateCost();
		    	/*$rootScope.statusGroups = it.statusGroups;
		  		$scope.budget.item[index] = it;
		  		updateCost();*/
		  		//toastr.success('Cambio hecho con éxito.', 'Listo');
			}, function() {
			   	console.log('Modal dismissed at: ' + new Date());
			});

    	};

        $scope.anyEdited = function() {
            return arr.length;
        };

        $scope.loadBudget = function() {

            var obj = {};
            obj.items = [];

            for(var i = 0; i < $scope.budget.item.length; i++) {
                var aux = $scope.budget.item[i];
                //aux.version++;
                obj.items.push(aux);
            }

            budget.update(obj).then(function(response) {
                toastr.success('Cambios hechos con éxito.', 'Listo');
                //budgetData.data.currentBudget = response.data;
                //$scope.budget.currentBudget = response.data;
                //$scope.currentBudget = response.data;

                $scope.budget = response.data;
                
                $scope.pages++;
                $scope.selectedPage = $scope.pages - 1;
                arr = [];
            }, function(response) {
                if(response.status == 500) {
                    toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
                }
            })
        };

        updateCost();

  	});
