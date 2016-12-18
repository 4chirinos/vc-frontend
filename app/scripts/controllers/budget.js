'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:BudgetCtrl
 * @description
 * # BudgetCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('BudgetCtrl', function ($rootScope, $scope, $uibModal, toastr, budgetData, session, budget, response) {

    	$scope.budget = budgetData.data;

        //console.log('hola');

        if($scope.budget.currentBudget.id) {
            $scope.currentBudget = $scope.budget.currentBudget;
            $scope.currentBudget.flag = $scope.budget.currentBudget.id;
        } else {
            $scope.currentBudget = angular.copy($scope.budget);
            $scope.currentBudget.flag = -1;
        }

    	var updateCost = function() {

    		var cost = 0;

    		for(var i = 0; i < $scope.budget.item.length; i++) {
    			cost += $scope.budget.item[i].cost * $scope.budget.item[i].quantity;
    		}

    		//$scope.cost = cost.toFixed(2);

            cost = cost.toFixed(2);
            cost = parseFloat(cost);
            cost = cost.toLocaleString('de-DE');

            $scope.cost = cost;

    	};

        $scope.formattedCost = function(cost) {
            cost = cost.toFixed(2);
            cost = parseFloat(cost);
            cost = cost.toLocaleString('de-DE');
            return cost;
        };

        var updateCurrentCost = function() {

            var cost = 0;

            for(var i = 0; i < $scope.currentBudget.item.length; i++) {
                cost += $scope.currentBudget.item[i].cost * $scope.currentBudget.item[i].quantity;
            }

            cost = cost.toFixed(2);
            cost = parseFloat(cost);
            cost = cost.toLocaleString('de-DE');

            $scope.currentCost = cost;

        };

    	updateCost();
        updateCurrentCost();

    	$scope.canEdit = function() {
    		if(response.data.statusId == '3' || response.data.statusId == '5')
    			return true;
    		return false;
    	};

    	$scope.user = session.getCurrentUser();

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
                $scope.currentBudget.item[index] = it;
                updateCurrentCost();
		    	/*$rootScope.statusGroups = it.statusGroups;
		  		$scope.budget.item[index] = it;
		  		updateCost();*/
		  		//toastr.success('Cambio hecho con éxito.', 'Listo');
			}, function() {
			   	console.log('Modal dismissed at: ' + new Date());
			});

    	};

        $scope.loadBudget = function() {

            var obj = {
                id: $scope.currentBudget.flag,
                parentBudgetId: $scope.currentBudget.id,
                items: []
            };

            for(var i = 0; i < $scope.currentBudget.item.length; i++) {
                var aux = $scope.currentBudget.item[i];
                delete aux.id;
                delete aux.historical;
                delete aux.budgetId;
                obj.items[i] = $scope.currentBudget.item[i];
            }

            //console.log(obj);

            budget.postBudget(obj).then(function(response) {
                toastr.success('Cambios hechos con éxito.', 'Listo');
                budgetData.data.currentBudget = response.data;
                $scope.budget.currentBudget = response.data;
                $scope.currentBudget = response.data;
                $scope.currentBudget.flag = response.data.id;
            }, function(response) {
                if(response.status == 500) {
                    toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
                }
            })
        };

  	});
