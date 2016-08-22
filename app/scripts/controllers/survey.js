'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:SurveyCtrl
 * @description
 * # SurveyCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('SurveyCtrl', function ($scope, surveyData, session) {

  		$scope.user = session.getCurrentUser();
  		
  		$scope.disabled = function() {
  			if($scope.user.userProfile == 'visitador') return false;
  			return true;
  		};

  	});
