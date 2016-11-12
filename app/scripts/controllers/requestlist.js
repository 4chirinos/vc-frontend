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

		//if($rootScope.obj) $rootScope.obj.fill = false;

		// inside your app controller
		/*$scope.images = [
		    {
		        title : 'This is amazing photo of nature',
		        alt : 'amazing nature photo',
		        thumbUrl : 'https://pixabay.com/static/uploads/photo/2016/06/13/07/32/cactus-1453793__340.jpg',
		        url : 'https://pixabay.com/static/uploads/photo/2016/06/13/07/32/cactus-1453793_960_720.jpg',
		        extUrl : 'http://mywebsitecpm/photo/1453793'
		    },
		    {
		        url : 'https://i.imgsafe.org/1b6ee795f5.png',
		        thumbUrl: 'https://i.imgsafe.org/1b6ee795f5.png',
		        extUrl : 'https://i.imgsafe.org/1b6ee795f5.png'
		    },
		    {
		        thumbUrl : 'https://pixabay.com/static/uploads/photo/2016/04/11/18/53/aviator-1322701__340.jpg',
		        url : 'https://pixabay.com/static/uploads/photo/2016/04/11/18/53/aviator-1322701_960_720.jpg'
		    }
		];

		// gallery methods
		$scope.methods = {};
		 
		// so you will bind openGallery method to a button on page
		// to open this gallery like ng-click="openGallery();"
		$scope.openGallery = function(){
		    $scope.methods.open();
		    
		    // You can also open gallery model with visible image index
		    // Image at that index will be shown when gallery modal opens
		    //scope.methods.open(index); 
		};
		 
		// Similar to above function
		$scope.closeGallery = function(){
		    $scope.methods.close();
		};
		 
		$scope.nextImg = function(){
		    $scope.methods.next();
		};
		 
		$scope.prevImg = function(){
		    $scope.methods.prev();
		};*/

	    var pageSize = 6;
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

    	/*$rootScope.$watch('filter', function () {
            if($rootScope.filter != null) {
            	selectChanged();
            }
        })*/

        $scope.category = function() {

        	/*if($stateParams.requestId || $stateParams.statusId || $stateParams.guaranteeLetterId || $stateParams.sd1 || $stateParams.sd2) {
        		return 'Filtrando';
        	}*/

        	/*if($scope.params && ($scope.params.sd1 || $scope.params.sd2 || $scope.params.guaranteeLetterId || $scope.params.requestId || $scope.params.statusId))
        		return 'Resultados de la búsqueda';*/

        	if($stateParams.guaranteeLetterId || $stateParams.requestId || $stateParams.sd1 || $stateParams.sd2)
        		return 'Resultados de la búsqueda';

        	if($stateParams.statusId) {
        		if($stateParams.statusId == 2) return 'No asignadas';
        		else if($stateParams.statusId == 3) return 'Asignadas';
        		else if($stateParams.statusId == 4) return 'Atendidas';
        		else if($stateParams.statusId == 5) return 'En revisión';
        		else return 'Finalizadas';
        	}

        	/*if($rootScope.obj && $rootScope.obj.fill) {
        		return 'Filtrando';
        	}*/

        	/*if($stateParams.filter) {
        		if($stateParams.filter == 2) return 'Por asignar';
        		else if($stateParams.filter == 3) return 'Asignadas';
        		else if($stateParams.filter == 4) return 'Atendidas';
        		else if($stateParams.filter == 5) return 'En revisión';
        		else return 'Finalizadas';
        	} else  {
        		return 'Todas';
        	}*/

        	return 'Todas';
        };

        $scope.filter = function() {

        	//$stateParams.filter = '';
        	
        	var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'views/filtermodal.html',
				controller: 'FiltermodalCtrl',
				size: 'md'
			});

			modalInstance.result.then(function(/*r*/) {
				/*$scope.params = r.params;
				$stateParams.filter = '';
				$scope.selectedPage = 0;
				$scope.requests = r.response.data.requests;
		    	$scope.pages = r.response.data.pageCount;
		    	$rootScope.statusGroups = r.response.data.statusGroups;*/
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
	  			if(status == 'finalizada') return 'finalizada';
	  		}
	  		if($scope.user.userProfile == 'coordinador') {
	  			if(status == 'por asignar') return 'por asignar';
	  			if(status == 'asignada') return 'asignada';
	  			if(status == 'atendida') return 'atendida';
	  			if(status == 'en revision') return 'en revision';
	  			if(status == 'finalizada') return 'finalizada';
	  		}
	  		if($scope.user.userProfile == 'visitador') {
	  			if(status == 'asignada') return 'pendiente';
	  			if(status == 'atendida') return 'atendida';
	  			if(status == 'en revision') return 'en revision';
	  			if(status == 'finalizada') return 'finalizada';
	  		}
        };

    	$scope.selectChanged = function() {
    		getRequest(1);
    		$scope.selectedPage = 0;
    	};

    	var getRequest = function(page) {

    		/*var params = null;

    		if($rootScope.obj) $rootScope.obj.page = page;

    		if($rootScope.obj && $rootScope.obj.fill) params = $rootScope.obj;
    		else params = {page: page, pageSize: pageSize, statusId: $stateParams.filter};*/

    		/*if($scope.params) {
    			$scope.params.page = page;
    		} else {
    			$scope.params = {page: page, pageSize: pageSize, statusId: $stateParams.filter};
    		}*/

    		var params = {
				guaranteeLetterId: $stateParams.guaranteeLetterId,
				requestId: $stateParams.requestId,
				statusId: $stateParams.statusId,
				page: page,
				pageSize: pageSize,
				sd1: $stateParams.sd1,
				sd2: $stateParams.sd2
			};

	  		request.getRequest(params).then(function(response) {
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
	  			if(status == 'finalizada') return 'label-default';
	  		}

	  		if($scope.user.userProfile == 'coordinador') {
	  			if(status == 'por asignar') return 'label-danger';
	  			if(status == 'asignada') return 'label-primary';
	  			if(status == 'atendida') return 'label-info';
	  			if(status == 'en revision') return 'label-warning';
	  			if(status == 'finalizada') return 'label-default';
	  		}

	  		if($scope.user.userProfile == 'visitador') {
	  			if(status == 'asignada') return 'label-danger';
	  			if(status == 'atendida') return 'label-info';
	  			if(status == 'en revision') return 'label-warning';
	  			if(status == 'finalizada') return 'label-default';
	  		}

	  	};

	  	$scope.date = function(date) {

	    	var currentdate = new Date(date);
			
			var datetime = "Last Sync: " + currentdate.getDate() + "/"
				+ (currentdate.getMonth() + 1)  + "/" 
				+ currentdate.getFullYear() + " @ "  
				+ currentdate.getHours() + ":"  
				+ currentdate.getMinutes() + ":" 
				+ currentdate.getSeconds();

	      	return currentdate.getDate() + '/' + (currentdate.getMonth() + 1) + '/' + currentdate.getFullYear();
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
