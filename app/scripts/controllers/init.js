'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:InitCtrl
 * @description
 * # InitCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('InitCtrl', function ($rootScope, $state, session) {
  		
  		if(session.getToken()) {

  			$rootScope.dt1 = null;
		    $rootScope.dt2 = null;
		    $rootScope.guaranteeId = null;
		    $rootScope.guaranteeId = null;
		    $rootScope.requestId = null;
		    $rootScope.selectedFilter = '';
		    $rootScope.obj = null;

	  		$state.go('main.home.requestlist', {
	  			filter: ''
	  		});
	  	} else {
	  		$state.go('login');
	  	}

  	});
