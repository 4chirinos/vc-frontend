'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:GuaranteeletterdetailCtrl
 * @description
 * # GuaranteeletterdetailCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('GuaranteeletterdetailCtrl', function ($scope, $stateParams, toastr, request, session) {
    	
    	$scope.guaranteeLetter = $stateParams.guaranteeletter;
	    $scope.user = session.getCurrentUser();

	    $scope.date = function(date) {
	      	date = date.split('T')[0].split('-');
	      	var yyyy = date[0], mm = date[1], dd = date[2];
	      	return dd + '/' + mm + '/' + yyyy;
	    };

	    $scope.gender = function(gender) {
	    	console.log('nojoda');
	    	if(gender == 'M') return 'Masculino';
	    	return 'Femenino';
	    };

	    $scope.age = function(date) {
	    	var today = new Date();
	    	date = date.split('T')[0].split('-');
	      	var yyyy = date[0], mm = date[1], dd = date[2];

	      	var age = today.getFullYear() - yyyy;

	      	var aux1 = today.getMonth() + 1 - mm, aux2 = today.getDay() - dd;

	      	console.log('aux1:' + aux1);
	      	console.log('aux2:' + aux2);

	      	if(aux1 > 0 || (aux1 == 0 && aux2 >= 0)) age++;

	      	return age;
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
	    	}, function(response) {
	    		if(response.status == 500) {
			        toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
			    }
	    	});
	    };

  	});
