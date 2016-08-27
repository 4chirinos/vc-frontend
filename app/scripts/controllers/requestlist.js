'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:RequestlistCtrl
 * @description
 * # RequestlistCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
	.controller('RequestlistCtrl', function ($scope, $rootScope, $stateParams, $uibModal, $state, toastr, session, request, response) {

	    var pageSize = 10;
	    $scope.selectedPage = 0;
    	$scope.user = session.getCurrentUser();

    	$scope.selectedFilter = $stateParams.filter;

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

    	/*$rootScope.$watch('filter', function () {
            if($rootScope.filter != null) {
            	selectChanged();
            }
        })*/

        $scope.filter = function() {
        	
        	var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'views/filtermodal.html',
				controller: 'FiltermodalCtrl',
				size: 'md'
			});

			modalInstance.result.then(function(cad) {
			   	console.log(cad);
			}, function() {
				console.log('Modal dismissed at: ' + new Date());
			});

        };

        $scope.statusText = function(status) {
        	if($scope.user.userProfile == 'analista') {
	  			if(status == 'por asignar') return 'por asignar';
	  			if(status == 'asignada') return 'asignada';
	  			if(status == 'atendida') return 'atendida';
	  			if(status == 'en revision') return 'en revision';
	  			if(status == 'completada') return 'completada';
	  			if(status == 'finalizada') return 'finalizada';
	  		}
	  		if($scope.user.userProfile == 'coordinador') {
	  			if(status == 'por asignar') return 'por asignar';
	  			if(status == 'asignada') return 'asignada';
	  			if(status == 'atendida') return 'atendida';
	  			if(status == 'en revision') return 'en revision';
	  			if(status == 'completada') return 'completada';
	  			if(status == 'finalizada') return 'finalizada';
	  		}
	  		if($scope.user.userProfile == 'visitador') {
	  			if(status == 'asignada') return 'pendiente';
	  			if(status == 'atendida') return 'atendida';
	  			if(status == 'en revision') return 'en revision';
	  			if(status == 'completada') return 'completada';
	  			if(status == 'finalizada') return 'finalizada';
	  		}
        };

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

	  	$scope.status = function(status) {

	  		if($scope.user.userProfile == 'analista') {
	  			if(status == 'por asignar') return 'label-danger';
	  			if(status == 'asignada') return 'label-primary';
	  			if(status == 'atendida') return 'label-info';
	  			if(status == 'en revision') return 'label-warning';
	  			if(status == 'completada') return 'label-success';
	  			if(status == 'finalizada') return 'label-default';
	  		}

	  		if($scope.user.userProfile == 'coordinador') {
	  			if(status == 'por asignar') return 'label-danger';
	  			if(status == 'asignada') return 'label-primary';
	  			if(status == 'atendida') return 'label-info';
	  			if(status == 'en revision') return 'label-warning';
	  			if(status == 'completada') return 'label-success';
	  			if(status == 'finalizada') return 'label-default';
	  		}

	  		if($scope.user.userProfile == 'visitador') {
	  			if(status == 'asignada') return 'label-danger';
	  			if(status == 'atendida') return 'label-info';
	  			if(status == 'en revision') return 'label-warning';
	  			if(status == 'completada') return 'label-success';
	  			if(status == 'finalizada') return 'label-default';
	  		}

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

	    $scope.detail = function(id) {
	    	$state.go(
		        'main.home.loaddata.requestdetail', {
		    		id: id
		    	}    
		    );
	    };    

	  	//getRequest(1);

  	});
