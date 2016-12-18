'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:PersondetailCtrl
 * @description
 * # PersondetailCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('PersondetailCtrl', function ($scope, $stateParams, $state, toastr, $uibModal, response) {
    	
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
	    	if(gender == 'M') return 'Masculino';
	    	return 'Femenino';
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

		    	console.log('ok');

			}, function() {
			   	console.log('Modal dismissed at: ' + new Date());
			});

	    };

	    $scope.statusColor = function(user) {
	    	if(user.available) {
	    		return 'label-danger';
	    	} else {
	    		return 'label-success';
	    	}
	    };

	    $scope.statusText = function(user) {
	    	if(user.available) {
	    		return 'deshabilitado';
	    	} else {
	    		return 'habilitado';
	    	}
	    };

  	});