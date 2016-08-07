'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:LoaddataCtrl
 * @description
 * # LoaddataCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('LoaddataCtrl', function ($scope, $stateParams) {
	    
  		$scope.content = 'budget';
  		$scope.budget = $stateParams.budget;

  		$scope.change = function(content) {
  			$scope.content = content;
  		};

  	});
