'use strict';

/**
 * @ngdoc directive
 * @name frontend2App.directive:sidebar
 * @description
 * # sidebar
 */
angular.module('frontend2App')
	.directive('sidebar', function ($rootScope) {
  		return {
      		templateUrl:'views/sidebar.html',
      		restrict: 'E',
      		scope: {},
      		controller: function($scope, $rootScope, $state, session) {

            $scope.user = session.getCurrentUser();

            $rootScope.$watch('statusGroups', function () {
              if($rootScope.statusGroups) {
                $scope.porAsignarse = $scope.asignadas = $scope.atendidas = $scope.enRevision = $scope.completadas = '';
                for(var i = 0; i < $rootScope.statusGroups.length; i++) {
                  if($rootScope.statusGroups[i].status == 'por asignar') $scope.porAsignarse = $rootScope.statusGroups[i].cantidad;
                  else if($rootScope.statusGroups[i].status == 'asignada') $scope.asignadas = $rootScope.statusGroups[i].cantidad;
                  else if($rootScope.statusGroups[i].status == 'atendidas') $scope.atendidas = $rootScope.statusGroups[i].cantidad;
                  else if($rootScope.statusGroups[i].status == 'en revision') $scope.enRevision = $rootScope.statusGroups[i].cantidad;
                  else $scope.completadas = $rootScope.statusGroups[i].cantidad;
                }
              }
            })

          }
    	};

  	});
