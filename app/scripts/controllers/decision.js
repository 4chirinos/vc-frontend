'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:DecisionCtrl
 * @description
 * # DecisionCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('DecisionCtrl', function ($scope, $stateParams, $rootScope, toastr, session, response, request) {
    	
  		$scope.user = session.getCurrentUser();

  		$scope.finish = function() {
            request.partialUpdate({id: $stateParams.id, statusId: 4})
            .then(function(response1) {
                response.data = response1.data;
                toastr.success('Finalización hecha con éxito.', 'Listo');
                $rootScope.statusGroups = response1.data.statusGroups;
            }, function(response1) {
                toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
            });
        };

        $scope.review = function() {
        	request.partialUpdate({id: $stateParams.id, statusId: 5})
            .then(function(response1) {
                response.data = response1.data;
                toastr.success('Envío a revisión hecho con éxito.', 'Listo');
                $rootScope.statusGroups = response1.data.statusGroups;
            }, function(response) {
                toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
            });
        };

        $scope.authorize = function() {
        	request.partialUpdate({id: $stateParams.id, statusId: 6})
            .then(function(response1) {
                response.data = response1.data;
                response.data.status = response1.data.status;
                toastr.success('Autorización hecha con éxito.', 'Listo');
                $rootScope.statusGroups = response1.data.statusGroups;
            }, function(response1) {
                toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
            });
        };

  	});
