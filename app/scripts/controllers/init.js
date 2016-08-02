'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:InitCtrl
 * @description
 * # InitCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('InitCtrl', function ($state, session) {
  		
  		if(session.getToken()) {
	  		$state.go('main.home.requestlist');
	  	} else {
	  		$state.go('login');
	  	}

  	});
