'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:FilterguaranteeCtrl
 * @description
 * # FilterguaranteeCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('FilterguaranteeCtrl', function ($scope, $rootScope, $state, $uibModalInstance, toastr, session, guaranteeletter) {

  		$scope.user = session.getCurrentUser();

      $scope.filters = [
        {filter: 'Todas', statusId: ''},
        {filter: 'Activada', statusId: '1'}
      ];

      $scope.status = '';

      $scope.reset = function() {
        $scope.guaranteeId = '';
        $scope.status = '';
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.BidentityCard = '';
      };

  		$scope.filter = function() {

  			$state.go('main.home.guaranteeletterlist',
  				{
  					guaranteeId: $scope.guaranteeId,
  					status: $scope.status,
  					firstName: $scope.firstName,
  					lastName: $scope.lastName,
  					BidentityCard: $scope.BidentityCard
  				}
  			);

  			$uibModalInstance.close('filtrado');
	    };

  		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

  	});
