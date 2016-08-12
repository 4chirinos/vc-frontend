'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:RequestdetailCtrl
 * @description
 * # RequestdetailCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('RequestdetailCtrl', function ($rootScope, $scope, $stateParams, $uibModal, $state, toastr, session, user, request, budget, response) {
    	
    	var pageSize = 10;

    	$scope.user = session.getCurrentUser();

    	if(response.status != 400 && response.status != 404 && response.status != 500) {
    		$scope.request = response.data;
    	} else {
    		$scope.request = null;
    		toastr.error('No se encontró visita asociada al código.', 'Error');
    	}

    	$scope.download = function() {
  			window.open('http://localhost:3000/api/v1/budget/' + $scope.request.guaranteeLetter.budget.id);
  		};

  		$scope.load = function() {
  			$state.go(
		        'main.home.loaddata.budget', {
		        	id: $scope.request.id
		        }
		    );
  		};

  		$scope.assign = function() {

	  		user.getVisitors(1, pageSize).then(function(response) {
	    		
	  			var modalInstance = $uibModal.open({
			      	animation: true,
			      	templateUrl: 'views/assignvisitormodal.html',
			      	controller: 'AssignvisitormodalCtrl',
			      	size: 'lg',
			      	resolve: {
			        	data: function () {
			          		return response.data;
			        	}
			      	}
		    	});

		  		modalInstance.result.then(function(visitor) {
		  			request.partialUpdate({id: $scope.request.id, visitorId: visitor.id, statusId: 3}).then(function(response) {
		  				if(response.data.created) {
		  					toastr.warning('Otro coordinador acaba de asignar esta visita.', 'Atención');
		  				} else {
		  					toastr.success('Asignación hecha con éxito.', 'Listo');
		  				}
		  				$scope.request = response.data;
		  				$rootScope.statusGroups = response.data.statusGroups;
		  			}, function(response) {
		  				if(response.status == 500) {
			          		toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
			        	}
		  			});

			    }, function() {
			    	console.log('Modal dismissed at: ' + new Date());
			    });

		  	}, function(response) {
		  		if(response.status == 500) {
	          		toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
	        	}
		  	});

	  	};

	  	$scope.date = function(date) {
		    date = date.split('T')[0].split('-');
		    var yyyy = date[0], mm = date[1], dd = date[2];
		    return dd + '/' + mm + '/' + yyyy;
		};

		$scope.gender = function(gender) {
		   	if(gender == 'M') return 'Masculino';
		    return 'Femenino';
		};

		$scope.age = function(date) {
		    var today = new Date();
		    date = date.split('T')[0].split('-');
		    var yyyy = date[0], mm = date[1], dd = date[2];

		    var age = today.getFullYear() - yyyy;

		    var aux1 = today.getMonth() + 1 - mm, aux2 = today.getDay() - dd;

		    if(aux1 > 0 || (aux1 == 0 && aux2 >= 0)) age++;

		    return age;
		};

  });
