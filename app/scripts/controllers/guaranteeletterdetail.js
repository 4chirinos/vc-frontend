'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:GuaranteeletterdetailCtrl
 * @description
 * # GuaranteeletterdetailCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('GuaranteeletterdetailCtrl', function ($rootScope, $scope, $state, $stateParams, toastr, request, session, response) {
        
	    $scope.user = session.getCurrentUser();

	    $rootScope.statusGroups = response.data.statusGroups;

	    if(response.data.guaranteeLetter.length == 1) {
    		$scope.guaranteeLetter = response.data.guaranteeLetter[0];
    	} else {
    		$scope.guaranteeLetter = null;
    		toastr.error('No se encontró carta aval asociada al código.', 'Error');
    	}

    	$scope.status = function(status) {

	  		if(status == 'activada')
	  			return 'text-success bg-success'

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

	    $scope.detail = function(id) {
	    	$state.go(
		        'main.home.requestdetail', {
		    		id: id
		    	}    
		    );
	    };

	    $scope.postRequest = function() {
	    	request.postRequest({guaranteeLetterId: $scope.guaranteeLetter.id, analystId: $scope.user.userId})
	    	.then(function(response) {
	    		if(response.data.created) {
	    			toastr.warning('Otro analista acaba de solicitar esta visita.', 'Atención');
	    		}
	    		$scope.guaranteeLetter.request = {
	    			id: response.data.id,
	    			guaranteeLetterId: response.data.guaranteeLetterId,
	    			statusId: response.data.statusId,
	    			coordinatorId: response.data.coordinatorId,
	    			visitorId: response.data.visitorId,
	    			analystId: response.data.analystId,
	    			formId: response.data.formId,
	    			startDate: response.data.startDate,
	    			endDate: response.data.endDate,
	    			status: response.data.status
	    		};
	    		$rootScope.statusGroups = response.data.statusGroups;
	    	}, function(response) {
	    		if(response.status == 500) {
			        toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
			    }
	    	});
	    };

  	});
