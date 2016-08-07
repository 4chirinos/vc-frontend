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

	  	$scope.submit = function() {

	  		var data = {
	  			identityCard: $scope.login.identityCard,
	  			password: $scope.login.password
	  		};

	  		session.login(data).then(function(response) {

	  			session.setToken(response.data.token);

		        session.setCurrentUser(response.data);
		        
		        $state.go('main.home.requestlist');

		        $scope.login = {};

	  		}, function(response) {

		        $log.log(response.status);

		        $scope.login = {};

		        if(response.status == 404) {
		          toastr.warning('Cédula y/o contraseña errónea', 'Error');
		        } else if(response.status == 500) {
		          toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
		        }
			
			});

	  	};

  	});