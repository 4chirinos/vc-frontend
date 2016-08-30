'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:FiltermodalCtrl
 * @description
 * # FiltermodalCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
	.controller('FiltermodalCtrl', function ($scope, $rootScope, $uibModalInstance, toastr, session, request) {

		$scope.user = session.getCurrentUser();

    if($rootScope.selectedFilter == null) $rootScope.selectedFilter = '';

		/*$scope.dateOptions = {
		    formatYear: 'yyyy',
		    maxDate: new Date(2020, 5, 22),
		    minDate: new Date(),
		    startingDay: 1
		};*/

    $scope.dateOptions = {
        formatYear: 'yyyy',
        startingDay: 1
    };

		$scope.open1 = function() {
    		$scope.popup1.opened = true;
  		};

  		$scope.open2 = function() {
    		$scope.popup2.opened = true;
  		};

  		$scope.popup1 = {
    		opened: false
  		};

  		$scope.popup2 = {
    		opened: false
  		};

  		var formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  		
  		$scope.format = formats[0];

  		//$scope.altInputFormats = ['M!/d!/yyyy'];

		if($scope.user.userProfile == 'analista') {
    		$scope.filters = [
    			{filter: 'Todas', statusId: ''},
    			{filter: 'Por asignar', statusId: '2'},
    			{filter: 'Asignada', statusId: '3'},
    			{filter: 'Atendida', statusId: '4'},
    			{filter: 'En revisión', statusId: '5'},
    			{filter: 'Finalizada', statusId: '6'}
    		];
    	} else if($scope.user.userProfile == 'coordinador') {
    		$scope.filters = [
    			{filter: 'Todas', statusId: ''},
    			{filter: 'Por asignar', statusId: '2'},
    			{filter: 'Asignada', statusId: '3'},
    			{filter: 'Atendida', statusId: '4'},
    			{filter: 'En revisión', statusId: '5'},
    			{filter: 'Finalizada', statusId: '6'}
    		];
    	} else {
    		$scope.filters = [
    			{filter: 'Todas', statusId: ''},
    			{filter: 'Por atender', statusId: '3'},
    			{filter: 'Atendida', statusId: '4'},
    			{filter: 'En revisión', statusId: '5'},
    			{filter: 'Finalizada', statusId: '6'}
    		];
    	}

		$scope.filter = function () {
			//$uibModalInstance.close('filtered');
      $rootScope.obj = {
        sd1: $rootScope.dt1,
        sd2: $rootScope.dt2,
        guaranteeLetterId: $rootScope.guaranteeId,
        requestId: $rootScope.requestId,
        statusId: $scope.selectedFilter,
        page: 1,
        pageSize: 6
      };

      if($rootScope.obj.sd1 || $rootScope.obj.sd2 || $rootScope.obj.guaranteeLetterId || $rootScope.obj.requestId || $rootScope.obj.statusId) {
        $rootScope.obj.fill = true;
      } else {
        $rootScope.obj.fill = false;
      }
      
      request.getRequest($rootScope.obj).then(function(response) {
        toastr.success('Búsqueda hecha con éxito.', 'Listo');
        $uibModalInstance.close(response);
      }, function(response) {
        toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
      });

		};

    $scope.reset = function() {
      $rootScope.dt1 = null;
      $rootScope.dt2 = null;
      $rootScope.guaranteeId = null;
      $rootScope.guaranteeId = null;
      $rootScope.requestId = null;
      $rootScope.selectedFilter = '';
      if($rootScope.obj) $rootScope.obj.fill = false;
    };

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

  });
