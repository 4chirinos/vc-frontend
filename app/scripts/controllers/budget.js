'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:BudgetCtrl
 * @description
 * # BudgetCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('BudgetCtrl', function ($rootScope, $stateParams, $scope, $uibModal, toastr, budgetData, session, budget, response, lastCurrentBudget) {

    	$scope.budget = budgetData.data;

        console.log(lastCurrentBudget.data);

        /*if(lastCurrentBudget.data.budgets) {
            $scope.pages = lastCurrentBudget.data.pageCount;
            $scope.selectedPage = $scope.pages - 1;
            $scope.currentBudget = lastCurrentBudget.data.budgets[0]; 
        }*/

        var arr = [];

        if(lastCurrentBudget.data != [] && lastCurrentBudget.data.budgets.length > 0) {
            //var i = lastCurrentBudget.data.budgets.length;
            $scope.currentBudget = angular.copy(lastCurrentBudget.data.budgets[0]);
            $scope.pages = lastCurrentBudget.data.pageCount;
            $scope.selectedPage = $scope.pages - 1;
        } else {
            $scope.currentBudget = angular.copy($scope.budget);
            $scope.pages = 0;
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

        /*if($scope.currentBudget) {
            updateCurrentCost();
        }*/

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
                arr[index] = true;
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

        $scope.edited = function(index) {
            return arr[index];
        };

        $scope.loadBudget = function() {

            var parent;

            if($scope.currentBudget.budgetId) {
                parent = $scope.currentBudget.budgetId
            } else {
                parent = $scope.currentBudget.id;
            }

            var obj = {
                parentBudgetId: parent,
                items: []
            };

            for(var i = 0; i < $scope.currentBudget.item.length; i++) {
                var aux = $scope.currentBudget.item[i];
                delete aux.id;
                delete aux.historical;
                delete aux.budgetId;
                obj.items[i] = $scope.currentBudget.item[i];
            }

            budget.postBudget(obj).then(function(response) {
                toastr.success('Cambios hechos con éxito.', 'Listo');
                //budgetData.data.currentBudget = response.data;
                //$scope.budget.currentBudget = response.data;
                $scope.currentBudget = response.data;
                lastCurrentBudget.data.budgets[0] = response.data;
                lastCurrentBudget.data.pageCount++;
                $scope.pages++;
                $scope.selectedPage = $scope.pages - 1;
                arr = [];
            }, function(response) {
                if(response.status == 500) {
                    toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
                }
            })
        };

        var getCurrentBudget = function(page) {

            var obj = {
                page: page
            };

            return budget.getCurrentBudget($stateParams.id, obj)
            .then(function(response) {
                $scope.currentBudget = response.data.budgets[0];
                console.log($scope.currentBudget);
            }, function(response) {
                if(response.status == 500) {
                    toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
                }
            });
            
        };

        $scope.pageSelected = function(index) {
            $scope.selectedPage = index;
            getCurrentBudget($scope.selectedPage + 1);
            //getRequest($scope.selectedPage + 1);
        };

        $scope.previousPage = function() {
            if($scope.selectedPage - 1 >= 0) {
                $scope.selectedPage--;
                getCurrentBudget($scope.selectedPage + 1);
                //getRequest($scope.selectedPage + 1);
            }
            else {
                console.log('extremo izquierdo');
            }
        };

        $scope.nextPage = function() {
            if($scope.selectedPage + 1 < $scope.pages) {
                $scope.selectedPage++;
                getCurrentBudget($scope.selectedPage + 1);
                //getRequest($scope.selectedPage + 1);
            }
            else {
                console.log('extremo derecho');
            }
        };

  	});
