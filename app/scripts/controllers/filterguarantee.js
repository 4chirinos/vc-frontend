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
        $scope.policyId = '';
      };

  		$scope.filter = function() {

  			/*var params = {
  				guaranteeId: $scope.guaranteeId,
  				statusId: $scope.status,
  				firstName: $scope.firstName,
  				lastName: $scope.lastName,
  				BidentityCard: $scope.BidentityCard,
          policyId: $scope.policyId,
          pageSize: 6
  			};*/

  			$uibModalInstance.close(/*params*/);

        $state.go('main.home.guaranteeletterlist', {
          guaranteeId: $scope.guaranteeId,
          requestId: $scope.requestId,
          statusId: $scope.selectedFilter,
          policyId: $scope.policyId,
          firstName: $scope.firstName,
          lastName: $scope.lastName,
          BidentityCard: $scope.BidentityCard,
          page: 1,
          pageSize: 6
        });

	    };

  		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

  	});
