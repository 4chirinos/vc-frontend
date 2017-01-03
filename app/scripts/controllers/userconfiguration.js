'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:UserconfigurationCtrl
 * @description
 * # UserconfigurationCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('UserconfigurationCtrl', function ($scope, $rootScope, $state, toastr, session, user, $uibModal) {
    	
    	$scope.user = session.getCurrentUser();
    	$scope.userNameBool = '';

    	$scope.changeUserName = function() {

    		$scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/changeusername.html',
                controller: 'UserconfigurationCtrl',
                size: 'md',
                scope: $scope
            });

            $scope.modalInstance.result.then(function(data) {

            	//$rootScope.statusGroups = response.data.statusGroups;
            	//$scope.$apply();

            	$state.go($state.current, {}, {reload: true});

			}, function() {
			   	console.log('Modal dismissed at: ' + new Date());
			});

    	};

    	$scope.changePassword = function() {

    		$scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/changepassword.html',
                controller: 'UserconfigurationCtrl',
                size: 'md',
                scope: $scope
            });

            $scope.modalInstance.result.then(function(data) {

			}, function() {
			   	console.log('Modal dismissed at: ' + new Date());
			});

    	};

    	$scope.verifyUserName = function() {

    		var obj = {
    			userName: $scope.userName
    		};
    		
    		user.verifyUsername(obj)
            .then(function(response) {

            	$scope.userNameBool = response.data;
            	console.log($scope.userNameBool);

            }, function(response) {
                //toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
            });

    	};

    	$scope.feedClass = function() {
    		/*if($scope.canSubmit()) return 'has-error';
    		if(!$scope.canSubmit()) return'has-success';
    		return '';*/

    		if($scope.userNameBool && $scope.userName) {
    			if($scope.userNameBool == '1' || $scope.userName.length <= 3 || $scope.userName.length >= 11) {
    				return 'has-error';
    			} else {
    				return 'has-success';
    			}
    		}
    	};

    	$scope.feedClass2 = function() {
    		if($scope.oldPassword) {
	    		if($scope.oldPassword.length < 8 || $scope.oldPassword.length > 15) {
	    			return 'has-error';
	    		} else {
	    			return 'has-success';
	    		}
	    	}
	    	return '';
    	};

    	$scope.feedClass3 = function() {
    		if($scope.newPassword) {
	    		if($scope.newPassword.length < 8 || $scope.newPassword.length > 15) {
	    			return 'has-error';
	    		} else {
	    			return 'has-success';
	    		}
	    	}
	    	return '';
    	};

    	$scope.feedClass4 = function() {
    		if($scope.newPassword2) {
	    		if($scope.newPassword2.length < 8 || $scope.newPassword2.length > 15) {
	    			return 'has-error';
	    		} else {
	    			return 'has-success';
	    		}
	    	}
	    	return '';
    	};

    	$scope.passwordMatch = function() {
    		if($scope.feedClass3() == 'has-success' && $scope.feedClass4() == 'has-success') {
    			return $scope.newPassword != $scope.newPassword2;
    		} else {
    			if($scope.feedClass3() != '' && $scope.feedClass4() != '')
    				return true;
    			return false;
    		}
    	};

    	$scope.ok = function() {
    		//$scope.modalInstance.close('ok');

    		user.partialUpdate({id: $scope.user.userId, userName: $scope.userName})
		    .then(function(response) {
		    	var aux = session.getCurrentUser();
		    	aux.userName = response.data.user.userName;
		    	session.setCurrentUser2(aux);
		    	$scope.user = aux;

		    	//$scope.$apply();

		    	toastr.success('Cambio de Nombre de Usuario hecho con éxito.', 'Listo');
		    	$scope.modalInstance.close('ok');
		    }, function(response) {
		    	if(response.status == 500) {
		    		toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
		    	}
		    });

    	};

    	$scope.ok2 = function() {
    		//$scope.modalInstance.close('ok');

    		user.partialUpdate({
    			id: $scope.user.userId,
    			newPassword: $scope.newPassword,
    			oldPassword: $scope.oldPassword
    		})
		    .then(function(response) {
		    	toastr.success('Cambio de Contraseña hecho con éxito.', 'Listo');
		    	$scope.modalInstance.close('ok');
		    }, function(response) {
		    	if(response.status == 500) {
		    		toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
		    	}
		    });

    	};

    	$scope.cancel = function() {
    		$scope.modalInstance.dismiss('cancel');
    	};

    	$scope.canSubmit = function() {

    		if(!$scope.userNameBool || !$scope.userName) return true;

    		if($scope.userNameBool && $scope.userName) {
    			return $scope.userNameBool == '1' || $scope.userName.length <= 3 || $scope.userName.length >= 11;
    		}

    	};

    	$scope.canSubmit2 = function() {

    		if($scope.feedClass2() && !$scope.passwordMatch()) {
    			return !($scope.feedClass2() == 'has-success');
    		} else {
    			return true;
    		}

    	};

  	});