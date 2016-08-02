'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:RequestdetailCtrl
 * @description
 * # RequestdetailCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('RequestdetailCtrl', function ($scope, $stateParams, $uibModal, toastr, session, user, request) {
    	
    	var pageSize = 10;

    	$scope.request = $stateParams.request;
    	$scope.user = session.getCurrentUser();

    	$scope.download = function() {
  			window.open('http://localhost:3000/api/v1/budget/' + $scope.request.guaranteeLetter.budget.id);
  		};

  		$scope.load = function() {
  			toastr.info('Carga de información.', 'Carga');
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
	  				console.log(response.data);
	  				if(response.data.created) {
	  					toastr.warning('Otro coordinador acaba de asignar esta visita.', 'Atención');
	  				} else {
	  					toastr.success('Asignación hecha con éxito.', 'Listo');
	  				}
	  				$scope.request = response.data;
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

  	});
