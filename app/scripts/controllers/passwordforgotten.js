'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:PasswordforgottenCtrl
 * @description
 * # PasswordforgottenCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('PasswordforgottenCtrl', function ($scope, $uibModalInstance, user) {
    
    	$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.ok = function() {

    		user.password($scope.userName)
		    .then(function(response) {
		    	$uibModalInstance.close('ok');
		    }, function(response) {
		    	$uibModalInstance.close('error');
		    });

    	};

		$scope.verifyUserName = function() {

    		var obj = {
    			userName: $scope.userName
    		};
    		
    		user.verifyUsername(obj)
            .then(function(response) {
            	$scope.userNameBool = response.data;
            }, function(response) {
                //toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
            });

    	};

    	$scope.feedClass = function() {

    		if($scope.userNameBool && $scope.userName) {
    			if($scope.userNameBool == '0' || $scope.userName.length <= 3 || $scope.userName.length >= 11) {
    				return 'has-error';
    			} else {
    				return 'has-success';
    			}
    		}
    	};

    	$scope.canSubmit = function() {
    		if(!$scope.userNameBool || !$scope.userName) return true;
    		if($scope.userNameBool && $scope.userName) {
    			return $scope.userNameBool == '0' || $scope.userName.length <= 3 || $scope.userName.length >= 11;
    		}
    	};

  	});
