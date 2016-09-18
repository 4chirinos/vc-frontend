'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:CommentCtrl
 * @description
 * # CommentCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('CommentCtrl', function ($scope, $uibModalInstance) {

  		$scope.ok = function() {
  			$uibModalInstance.close($scope.coment);
  		};

  		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

  	});
