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

        var arr = [];

        if(lastCurrentBudget.data != 'nada' && lastCurrentBudget.data.budgets.length > 0) {
            $scope.currentBudget = angular.copy(lastCurrentBudget.data.budgets[0]);
            $scope.pages = lastCurrentBudget.data.pageCount;
            $scope.selectedPage = $scope.pages - 1;
        } else {
            $scope.currentBudget = angular.copy($scope.budget);
            $scope.pages = 1;
            $scope.selectedPage = $scope.pages - 1;
        }

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
            return arr[index] && $scope.selectedPage + 1 == $scope.pages;
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
                if(lastCurrentBudget.data != 'nada') {
                    lastCurrentBudget.data.budgets[0] = response.data;
                    lastCurrentBudget.data.pageCount++;
                } else {
                    lastCurrentBudget.data = {};
                    lastCurrentBudget.data.pageCount = 0;
                    lastCurrentBudget.data.budgets = [];
                    lastCurrentBudget.data.budgets[0] = response.data;
                    lastCurrentBudget.data.pageCount++;
                }
                $scope.pages++;
                $scope.selectedPage = $scope.pages - 1;
                arr = [];
            }, function(response) {
                if(response.status == 500) {
                    toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
                }
            })
        };

        $scope.date = function(date) {
            var currentdate = new Date(date);
            return currentdate.getDate() + '/' + (currentdate.getMonth() + 1) + '/' + currentdate.getFullYear();
        };

        $scope.hour = function(date) {
            var currentdate = new Date(date);
            return currentdate.getHours() + ':' + currentdate.getMinutes(); 
        };

        var getCurrentBudget = function(page) {

            var obj = {
                page: page
            };

            return budget.getCurrentBudget($stateParams.id, obj)
            .then(function(response) {
                $scope.currentBudget = response.data.budgets[0];
            }, function(response) {
                if(response.status == 500) {
                    toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
                }
            });
            
        };

        $scope.anyEdited = function() {
            return arr.length;
        };

        $scope.pageSelected = function(index) {
            if(index == 0) {
                $scope.currentBudget = angular.copy($scope.budget);
                $scope.selectedPage = 0;
                arr = [];
            } else {
                $scope.selectedPage = index;
                getCurrentBudget($scope.selectedPage);
                arr = [];
            }
        };

        $scope.previousPage = function() {
            if($scope.selectedPage - 1 >= 0) {
                $scope.pageSelected($scope.selectedPage - 1);
                /*$scope.selectedPage--;
                getCurrentBudget($scope.selectedPage);
                arr = [];*/
            }
            else {
                console.log('extremo izquierdo');
            }
        };

        $scope.nextPage = function() {
            if($scope.selectedPage + 1 < $scope.pages) {
                $scope.pageSelected($scope.selectedPage + 1);
                /*$scope.selectedPage++;
                getCurrentBudget($scope.selectedPage);
                arr = [];*/
            }
            else {
                console.log('extremo derecho');
            }
        };

  	});
