'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:BudgetdetailCtrl
 * @description
 * # BudgetdetailCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('BudgetdetailCtrl', function ($scope, response) {

  		if(response.status == 500) {
  			toastr.error('No se encontró presupuesto asociado al código.', 'Error');
  		} else {
  			$scope.data = response.data;
  		}

  		$scope.phones = function(data) {
	    	var aux = "";
	    	for(var i = 0; i < data.length; i++) {
	    		aux += data[i].phoneNumber;
	    		if(i != data.length - 1) {
	    			aux += " / ";
	    		}
	    	}
	    	return aux;
	    };

	    $scope.gender = function(gender) {
		   	if(gender == 'M') return 'Masculino';
		    return 'Femenino';
		};

  	});
