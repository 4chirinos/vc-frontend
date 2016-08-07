'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:RequestlistCtrl
 * @description
 * # RequestlistCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
	.controller('RequestlistCtrl', function ($scope, $rootScope, helpers, $state, toastr, session, request, response) {
	    
	    var pageSize = 10;
	    $scope.selectedPage = 0;
    	$scope.user = session.getCurrentUser();

    	if(response.status == 500) {
    		toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
    	} else {
    		$scope.requests = response.data.requests;
	    	$scope.pages = response.data.pageCount;
	    	$rootScope.statusGroups = response.data.statusGroups;
    	}

    	if($scope.user.userProfile == 'analista') {
    		$scope.filters = [
    			{filter: 'Todas', statusId: ''},
    			{filter: 'Sin asignar', statusId: '2'},
    			{filter: 'Asignada', statusId: '3'},
    			{filter: 'Atendida', statusId: '4'},
    			{filter: 'Finalizada', statusId: '6'},
    		];
    	} else if($scope.user.userProfile == 'coordinador') {
    		$scope.filters = [
    			{filter: 'Todas', statusId: ''},
    			{filter: 'Sin asignar', statusId: '2'},
    			{filter: 'Asignada', statusId: '3'},
    			{filter: 'Atendida', statusId: '4'},
    			{filter: 'Finalizada', statusId: '6'},
    		];
    	} else {
    		$scope.filters = [
    			{filter: 'Todas', statusId: ''},
    			{filter: 'Sin atender', statusId: '3'},
    			{filter: 'Atendida', statusId: '4'},
    			{filter: 'Finalizada', statusId: '6'},
    		];
    	}

    	$scope.selectChanged = function() {
    		getRequest(1);
    		$scope.selectedPage = 0;
    	};

    	var getRequest = function(page) {
	  		request.getRequest(page, pageSize, $scope.selectedFilter).then(function(response) {
	    		$scope.requests = response.data.requests;
	    		$scope.pages = response.data.pageCount;
	    		$rootScope.statusGroups = response.data.statusGroups;
		  	}, function(response) {
		  		if(response.status == 500) {
		        	toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
		        }
		  	});
	  	};

	  	$scope.date = function(date) {
	      	date = date.split('T')[0].split('-');
	      	var yyyy = date[0], mm = date[1], dd = date[2];
	      	return dd + '/' + mm + '/' + yyyy;
	    };

	    $scope.pageSelected = function(index) {
	    	$scope.selectedPage = index;
	    	getRequest($scope.selectedPage + 1);
	    };

	    $scope.previousPage = function() {
	    	if($scope.selectedPage - 1 >= 0) {
	    		$scope.selectedPage--;
	    		getRequest($scope.selectedPage + 1);
	    	}
	    	else {
	    		console.log('extremo izquierdo');
	    	}
	    };

	    $scope.nextPage = function() {
	    	if($scope.selectedPage + 1 < $scope.pages) {
	    		$scope.selectedPage++;
	    		getRequest($scope.selectedPage + 1);
	    	}
	    	else {
	    		console.log('extremo derecho');
	    	}
	    };

	    $scope.detail = function(request) {
	    	$state.go(
	        	'main.home.requestdetail', {
	        	request: request
	      	});
	    };    

	  	//getRequest(1);

  	});
