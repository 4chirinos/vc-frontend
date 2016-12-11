'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:LoaddataCtrl
 * @description
 * # LoaddataCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('LoaddataCtrl', function ($scope, $state, $stateParams, toastr, session, response) {
	    
  		$scope.user = session.getCurrentUser();

      if(response.status != 400 && response.status != 404 && response.status != 500) {
        $scope.response = response.data;
      } else {
        toastr.error('No se encontró visita asociada al código.', 'Error');
      }

      $scope.title = function() {
        if($scope.response) {
          return 'Información de la visita clínica asociada al código: ' + $stateParams.id;
        }
        return 'No se encontró visita clínica asociada código.';
      };

  		$scope.decision = function() {
  			if($scope.user.userProfile == 'visitador') return 'Finalización';
  			if($scope.user.userProfile == 'coordinador') return 'Autorización';
  			return 'Algo';
  		};

  		$scope.iconClass = function() {
  			if($scope.user.userProfile == 'visitador') return 'glyphicon glyphicon-ok-sign';
  			if($scope.user.userProfile == 'coordinador') return 'glyphicon glyphicon-question-sign';
  			return 'Algo';
  		};

      $scope.shouldBeActive = function() {
        return $state.includes("main.home.loaddata.budget.originalbudget") || $state.includes("main.home.loaddata.budget.currentbudget");
      };

  	});
