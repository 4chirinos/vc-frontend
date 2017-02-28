'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:EditingaffiliatedCtrl
 * @description
 * # EditingaffiliatedCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('EditingaffiliatedCtrl', function ($scope, $uibModalInstance) {

  		$scope.data = angular.copy($scope.affiliated);

  		$scope.data.newPhones = $scope.phones($scope.affiliated.phones);

  		$scope.state = $scope.affiliated.stateId + '';

  		$scope.states = [
	        {filter: 'Amazonas', stateId: '1'},
	        {filter: 'Anzoátegui', stateId: '2'},
	        {filter: 'Apure', stateId: '3'},
	        {filter: 'Aragua', stateId: '4'},
	        {filter: 'Barinas', stateId: '5'},
	        {filter: 'Bolívar', stateId: '6'},
	        {filter: 'Carabobo', stateId: '7'},
	        {filter: 'Cojedes', stateId: '8'},
	        {filter: 'Delta Amacuro', stateId: '9'},
	        {filter: 'Falcón', stateId: '10'},
	        {filter: 'Distrito Capital', stateId: '11'},
	        {filter: 'Guárico', stateId: '12'},
	        {filter: 'Lara', stateId: '13'},
	        {filter: 'Mérida', stateId: '14'},
	        {filter: 'Miranda', stateId: '14'},
	        {filter: 'Monagas', stateId: '16'},
	        {filter: 'Nueva Esparta', stateId: '17'},
	        {filter: 'Portuguesa', stateId: '18'},
	        {filter: 'Sucre', stateId: '19'},
	        {filter: 'Tachira', stateId: '20'},
	        {filter: 'Trujillo', stateId: '21'},
	        {filter: 'Vargas', stateId: '22'},
	        {filter: 'Yaracuy', stateId: '23'},
	        {filter: 'Zulia', stateId: '24'}
	    ];

	    $scope.ok = function(valid) {
	    	$scope.data.stateId = $scope.state;
  			$uibModalInstance.close($scope.data);
	    };
    	
  		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

  	});
