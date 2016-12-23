'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:PersondetailCtrl
 * @description
 * # PersondetailCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('PersondetailCtrl', function ($scope, $stateParams, $state, toastr, session, user, $uibModal, response) {
    	
    	$scope.user = session.getCurrentUser();

  		if(response.data.id) {
  			$scope.person = response.data;
  		} else {
  			$scope.person = null;
  			toastr.error('No se encontró persona asociada al código.', 'Error');
  		}

  		$scope.age = function(date) {
	    	var today = new Date();
	    	date = date.split('T')[0].split('-');
	      	var yyyy = date[0], mm = date[1], dd = date[2];

	      	var age = today.getFullYear() - yyyy;

	      	var aux1 = today.getMonth() + 1 - mm, aux2 = today.getDay() - dd;

	      	if(aux1 > 0 || (aux1 == 0 && aux2 >= 0)) age++;

	      	return age;
	    };

	    $scope.gender = function(gender) {
	    	if(gender == 'M') return 'MASCULINO';
	    	return 'FEMENINO';
	    };

	    $scope.createUser = function() {
	    	
	    	/*var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/createusermodal.html',
                //controller: 'CreateusermodalCtrl',
                size: 'md'
            });*/

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/createusermodal.html',
                controller: 'CreateusermodalCtrl',
                size: 'md'
            });

            modalInstance.result.then(function(data) {

		    	user.postUser({personId: $scope.person.id, profileId: data.profileId})
		    	.then(function(response) {
		    		$scope.person = response.data;
		    		toastr.success('Creación de usuario hecha con exito.', 'Listo');
		    	}, function(response) {
		    		if(response.status == 500) {
		    			toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
		    		}
		    	});

			}, function() {
			   	console.log('Modal dismissed at: ' + new Date());
			});

	    };

	    $scope.statusColor = function(user) {
	    	if(user.available) {
	    		return 'label-success';
	    	} else {
	    		return 'label-warning';
	    	}
	    };

	    $scope.statusText = function(user) {
	    	if(user.available) {
	    		return 'habilitado';
	    	} else {
	    		return 'deshabilitado';
	    	}
	    };

	    $scope.userEnabled = function() {
	    	user.partialUpdate({id: $scope.person.user.id, available: true})
		    .then(function(response) {
		    	$scope.person = response.data;
		    	toastr.success('Habilitación de usuario hecha con exito.', 'Listo');
		    }, function(response) {
		    	if(response.status == 500) {
		    		toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
		    	}
		    });
	    };

	    $scope.userDisabled = function() {
	    	user.partialUpdate({id: $scope.person.user.id, available: false})
		    .then(function(response) {
		    	$scope.person = response.data;
		    	toastr.warning('Deshabilitación de usuario hecha con exito.', 'Listo');
		    }, function(response) {
		    	if(response.status == 500) {
		    		toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
		    	}
		    });
	    };

	    $scope.changeRole = function() {

	    	var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/createusermodal.html',
                controller: 'CreateusermodalCtrl',
                size: 'md'
            });

            modalInstance.result.then(function(data) {

		    	user.partialUpdate({id: $scope.person.user.id, profileId: data.profileId})
			    .then(function(response) {
			    	$scope.person = response.data;
			    	toastr.success('Cambio de rol hecho con exito.', 'Listo');
			    }, function(response) {
			    	if(response.status == 500) {
			    		toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
			    	}
			    });

			}, function() {
			   	console.log('Modal dismissed at: ' + new Date());
			});

	    	/*user.partialUpdate({id: $scope.person.user.id, available: false})
		    .then(function(response) {
		    	$scope.person = response.data;
		    	toastr.warning('Deshabilitación de usuario hecha con exito.', 'Listo');
		    }, function(response) {
		    	if(response.status == 500) {
		    		toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
		    	}
		    });*/
	    };

  	});