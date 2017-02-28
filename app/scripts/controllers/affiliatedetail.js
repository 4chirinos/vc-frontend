'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:AffiliatedetailCtrl
 * @description
 * # AffiliatedetailCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('AffiliatedetailCtrl', function ($scope, $uibModal, toastr, affiliated, response) {
    	
    	console.log("hola");

  		if(response.status == 500) {
  			toastr.error('No se encontró persona asociada al código.', 'Error');
  		} else {
  			$scope.affiliated = response.data;
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

	    $scope.editing = function() {

    		$scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/editaffiliated.html',
                controller: 'EditingaffiliatedCtrl',
                size: 'lg',
                scope: $scope
            });

            $scope.modalInstance.result.then(function(data) {

            	var obj = {
            		id: data.id,
            		name: data.name,
            		rif: data.rif,
            		address: data.address,
            		phones: data.newPhones,
            		stateId: data.stateId
            	};
            	
            	affiliated.partialUpdate(obj).then(function(response2) {
	                toastr.success('Cambios hechos con éxito.', 'Listo');
	                $scope.affiliated = response2.data;
	            }, function(response2) {
	                if(response2.status == 500) {
	                    toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
	                }
	            })


			}, function() {
			   	console.log('Modal dismissed at: ' + new Date());
			});

    	};

  	});
