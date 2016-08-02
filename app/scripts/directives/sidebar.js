'use strict';

/**
 * @ngdoc directive
 * @name frontend2App.directive:sidebar
 * @description
 * # sidebar
 */
angular.module('frontend2App')
	.directive('sidebar', function () {
  		return {
      		templateUrl:'views/sidebar.html',
      		restrict: 'E',
      		scope: {},
      		controller: function($scope, $rootScope, $state, session) {

            $scope.user = session.getCurrentUser();
            var statusGroups = $rootScope.statusGroups;

            for(var i = 0; i < statusGroups.length; i++) {
              if(statusGroups[i].status == 'por asignar') $scope.porAsignarse = statusGroups[i].cantidad;
              else if(statusGroups[i].status == 'asignada') $scope.asignadas = statusGroups[i].cantidad;
              else if(statusGroups[i].status == 'atendidas') $scope.atendidas = statusGroups[i].cantidad;
              else if(statusGroups[i].status == 'en revision') $scope.enRevision = statusGroups[i].cantidad;
              else $scope.completadas = statusGroups[i].cantidad;
            }

	      	}
    	};

  	});
