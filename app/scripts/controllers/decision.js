'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:DecisionCtrl
 * @description
 * # DecisionCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('DecisionCtrl', function ($scope, $stateParams, $rootScope, toastr, session, request) {
    	
  		$scope.user = session.getCurrentUser();

  		$scope.finish = function() {
            request.partialUpdate({id: $stateParams.id, statusId: 4})
            .then(function(response) {
                toastr.success('Finalización hecha con éxito.', 'Listo');
                $rootScope.statusGroups = response.data.statusGroups;
            }, function(response) {
                toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
            });
        };

        $scope.review = function() {
        	request.partialUpdate({id: $stateParams.id, statusId: 5})
            .then(function(response) {
                toastr.success('Envío a revisión hecho con éxito.', 'Listo');
                $rootScope.statusGroups = response.data.statusGroups;
            }, function(response) {
                toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
            });
        };

        $scope.authorize = function() {
        	request.partialUpdate({id: $stateParams.id, statusId: 6})
            .then(function(response) {
                toastr.success('Autorización hecha con éxito.', 'Listo');
                $rootScope.statusGroups = response.data.statusGroups;
            }, function(response) {
                toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
            });
        };

  	});
