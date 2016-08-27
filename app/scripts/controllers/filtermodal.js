'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:FiltermodalCtrl
 * @description
 * # FiltermodalCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
	.controller('FiltermodalCtrl', function ($scope, $uibModalInstance, session) {

		$scope.user = session.getCurrentUser();
		$scope.selectedFilter = '';

		$scope.dt = new Date();

		$scope.dateOptions = {
		    formatYear: 'yyyy',
		    maxDate: new Date(2020, 5, 22),
		    minDate: new Date(),
		    startingDay: 1
		};

		$scope.open1 = function() {
    		$scope.popup1.opened = true;
  		};

  		var formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  		
  		$scope.format = formats[0];

  		$scope.popup1 = {
    		opened: false
  		};

  		//$scope.altInputFormats = ['M!/d!/yyyy'];

		if($scope.user.userProfile == 'analista') {
    		$scope.filters = [
    			{filter: 'Todas', statusId: ''},
    			{filter: 'Por asignar', statusId: '2'},
    			{filter: 'Asignada', statusId: '3'},
    			{filter: 'Atendida', statusId: '4'},
    			{filter: 'En revisión', statusId: '5'},
    			{filter: 'Completada', statusId: '6'},
    			{filter: 'Finalizada', statusId: '7'}
    		];
    	} else if($scope.user.userProfile == 'coordinador') {
    		$scope.filters = [
    			{filter: 'Todas', statusId: ''},
    			{filter: 'Por asignar', statusId: '2'},
    			{filter: 'Asignada', statusId: '3'},
    			{filter: 'Atendida', statusId: '4'},
    			{filter: 'En revisión', statusId: '5'},
    			{filter: 'Completada', statusId: '6'},
    			{filter: 'Finalizada', statusId: '7'}
    		];
    	} else {
    		$scope.filters = [
    			{filter: 'Todas', statusId: ''},
    			{filter: 'Por atender', statusId: '3'},
    			{filter: 'Atendida', statusId: '4'},
    			{filter: 'En revisión', statusId: '5'},
    			{filter: 'Completada', statusId: '6'},
    			{filter: 'Finalizada', statusId: '7'}
    		];
    	}

		$scope.filter = function () {
			$uibModalInstance.close('filtered');
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

  	});
