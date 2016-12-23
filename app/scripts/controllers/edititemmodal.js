'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:EdititemmodalCtrl
 * @description
 * # EdititemmodalCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('EdititemmodalCtrl', function ($scope, $uibModalInstance, toastr, data, item) {
    	
    	$scope.it = data;

      $scope.history = false;
      $scope.historyText = 'Ver historial de cambios';

      $scope.historical = data.historical;

      $scope.toggleHistory = function() {
        if($scope.history) {
          $scope.history = false;
          $scope.historyText = 'Ver historial de cambios';
        } else {
          $scope.history = true;
          $scope.historyText = 'Ocultar historial de cambios';
        }
      };

  		$scope.edited = function(valid) {

        $uibModalInstance.close($scope.it);

  			/*item.partialUpdate($scope.it).then(function(response) {
  				$uibModalInstance.close(response.data);
  			}, function(response) {
  				if(response.status == 500) {
			        toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
			    }
  			});*/

	    };

	    $scope.cancel = function () {
  			$uibModalInstance.dismiss('cancel');
  		};

  });
