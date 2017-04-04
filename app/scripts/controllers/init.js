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

  			var user = session.getCurrentUser();

  			if(user.userProfile == 'administrador') {
		    	$state.go('main.home.personlist');
		    } else if(user.userProfile == 'analista') {
		    	$state.go('main.home.guaranteeletterlist');
		    } else {
		    	$state.go('main.home.requestlist', {
		  			filter: ''
		  		});
		    }
		    
	  	} else {
	  		$state.go('login');
	  	}

  	});
