'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('LoginCtrl', function ($scope, $log, $state, toastr, session) {

	  	$scope.login = {};

	  	$scope.submit = function(valid) {

	  		if(valid) {

		  		var data = {
		  			userName: $scope.login.identityCard,
		  			password: $scope.login.password
		  		};

		  		session.login(data).then(function(response) {

		  			session.setToken(response.data.token);

			        session.setCurrentUser(response.data);

			        var user = session.getCurrentUser();

			        console.log(user);

		  			if(user.userProfile == 'administrador') {
				    	$state.go('main.home.personlist');
				    } else if(user.userProfile == 'analista') {
				    	$state.go('main.home.guaranteeletterlist');
				    } else {
				    	$state.go('main.home.requestlist', {
				  			filter: ''
				  		});
				    }

		  		}, function(response) {

			        $log.log(response.status);

			        $scope.login = {};

			        if(response.status == 404) {
			          toastr.warning('Cédula y/o contraseña errónea', 'Error');
			        } else if(response.status == 500) {
			          toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
			        }
				
				});

		  	}

	  	};

  	});
