'use strict';

/**
 * @ngdoc directive
 * @name frontend2App.directive:header
 * @description
 * # header
 */
angular.module('frontend2App')
  	.directive('header', function ($state, toastr, guaranteeletter) {
  		return {
      		templateUrl:'views/header.html',
      		restrict: 'E',
      		scope: {
      			code: '='
      		},
      		link: function(scope, elem, attr, ctrl) {

      			scope.search = function() {
      				
		          	guaranteeletter.getGuaranteeLetter({code: scope.code}).then(function(response) {
		          		if(response.data.length == 1) {
			            	$state.go(
			              		'main.home.guaranteeletterdetail', {
			                		guaranteeletter: response.data[0]
			              		}
			            	);
			            } else {
			            	toastr.error('No se encontró carta aval asociada al código.', 'Error');
			            }

		          	}, function(response) {
		            	if(err.status = 500) {
		              		toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
		            	}
		          	});

		        };

      		},
      		controller: function($scope, $state, session, guaranteeletter) {

      			$scope.user = session.getCurrentUser();

      			if($scope.user.userProfile == 'analista') {
      				$scope.placeholder = 'Código carta aval';
      			} else {
      				$scope.placeholder = 'Código visita clínica';
      			}

	        	$scope.logout = function() {
	          		session.logout().then(function(data) {
	            		$state.go('login');
	          		}, function(err) {
	          			console.log('Ocurrió un error');
	            		$state.go('login');
	          		});
	        	};

	      	}

    	};

  	});
