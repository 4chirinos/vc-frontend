'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:FiltermodalCtrl
 * @description
 * # FiltermodalCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
	.controller('FiltermodalCtrl', function ($scope, $state, $uibModalInstance, toastr, session, request) {

		$scope.user = session.getCurrentUser();

    $scope.selectedFilter = '';

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

      var date1 = $scope.dt1, date2 = $scope.dt2;

      if($scope.dt1) {
        date1 = new Date($scope.dt1);
        date1 = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate();
      }

      if($scope.dt2) {
        date2 = new Date($scope.dt2);
        date2 = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate();
      }

      /*var obj = {
        sd1: date1,
        sd2: date2,
        guaranteeLetterId: $scope.guaranteeId,
        requestId: $scope.requestId,
        statusId: $scope.selectedFilter,
        page: 1,
        pageSize: 6
      };*/
      
      $uibModalInstance.close();

      $state.go('main.home.requestlist', {
        guaranteeLetterId: $scope.guaranteeId,
        requestId: $scope.requestId,
        statusId: $scope.selectedFilter,
        page: 1,
        pageSize: 6,
        sd1: date1,
        sd2: date2
      });

      /*if($rootScope.obj.sd1 || $rootScope.obj.sd2 || $rootScope.obj.guaranteeLetterId || $rootScope.obj.requestId || $rootScope.obj.statusId) {
        $rootScope.obj.fill = true;
        //console.log('hola');
      } else {
        //console.log('chao');
        $rootScope.obj.fill = false;
      }*/
      
      /*request.getRequest(obj).then(function(response) {
        toastr.success('Búsqueda hecha con éxito.', 'Listo');
        var r = {
          params: obj,
          response: response
        };
        $uibModalInstance.close(r);
      }, function(response) {
        toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
      });*/

		};

    $scope.reset = function() {
      $scope.dt1 = null;
      $scope.dt2 = null;
      $scope.guaranteeId = null;
      $scope.guaranteeId = null;
      $scope.requestId = null;
      $scope.selectedFilter = '';
      //if($scope.obj) $scope.obj.fill = false;
    };

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

  });
