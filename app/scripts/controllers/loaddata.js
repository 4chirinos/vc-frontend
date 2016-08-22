'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:LoaddataCtrl
 * @description
 * # LoaddataCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('LoaddataCtrl', function ($scope, $stateParams, session) {
	    
  		$scope.user = session.getCurrentUser();

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

  	});
