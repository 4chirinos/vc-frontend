'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:EditpersonCtrl
 * @description
 * # EditpersonCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('EditpersonCtrl', function ($scope, $uibModalInstance) {

  		$scope.data = angular.copy($scope.person);

  		$scope.data.newPhones = $scope.phones($scope.person.phones);

  		$scope.data.email = $scope.emails($scope.person.emails);

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

  		$scope.dt1 = new Date($scope.data.birthDate);

  		$scope.genders = [
	        {filter: 'Femenino', genderId: 'F'},
	        {filter: 'Masculino', genderId: 'M'}
	    ];

	    $scope.state = $scope.person.stateId + '';

	    $scope.gender = $scope.person.gender;

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
    		var aux = $scope.dt1.getFullYear() + '-' + ($scope.dt1.getMonth() + 1) + '-' + $scope.dt1.getDate();
  			$scope.data.birthDate = aux;
  			$uibModalInstance.close($scope.data);
	    };
    	
  		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};

  	});
