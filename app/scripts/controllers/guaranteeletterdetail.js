'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:GuaranteeletterdetailCtrl
 * @description
 * # GuaranteeletterdetailCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('GuaranteeletterdetailCtrl', function ($rootScope, $scope, $state, $stateParams, $uibModal, toastr, request, session, baseUrl, response) {
        
	    $scope.user = session.getCurrentUser();

	    $rootScope.statusGroups = response.data.statusGroups;

	    if(response.data.id) {
    		$scope.guaranteeLetter = response.data;
    		if(response.data.request.length)
    			$scope.history = response.data.request;
    		else
    			$scope.history = null;

    	} else {
    		$scope.guaranteeLetter = null;
    		toastr.error('No se encontró carta aval asociada al código.', 'Error');
    	}

    	$scope.downloadBudget = function() {
    		var last = "";
            if($scope.user.userProfile == "visitador") last = "/false";
            else last = "/true";
  			window.open(baseUrl + '/document/budget/' + $scope.guaranteeLetter.budget.id + '/1' + last);
  		};

  		$scope.downloadGuarantee = function() {
  			window.open(baseUrl + '/document/guaranteeLetter/' + $scope.guaranteeLetter.id);
  		};

  		$scope.emails = function(data) {
	    	var aux = "";
	    	for(var i = 0; i < data.length; i++) {
	    		aux += data[i].email;
	    		if(i != data.length - 1) {
	    			aux += " / ";
	    		}
	    	}
	    	return aux;
	    };

  		$scope.phones = function(data) {
	    	var aux = "";
	    	for(var i = 0; i < data.length; i++) {
	    		aux += data[i].phoneNumber;
	    		if(i != data.length - 1) {
	    			aux += " / ";
	    		}
	    	}
	    	return aux;
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

        $scope.status2 = function(status) {

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

	  	$scope.statusText2 = function(guarantee) {
	    	/*var startDate = guarantee.startDate.split('T')[0].split('-'),
	    		endDate = guarantee.endDate.split('T')[0].split('-');

	    	if(startDate[0] > endDate[0]) return 'vencida';
	    	if(startDate[1] > endDate[1]) return 'vencida';
	    	if(startDate[2] > endDate[2] && startDate[0] == endDate[0]) return 'vencida';

	      	return guarantee.status.status;*/

	      	var d1 = new Date(guarantee.startDate), d2 = new Date(guarantee.endDate);
	    	d1.setHours(0, 0, 0, 0);
	    	d2.setHours(0, 0, 0, 0);

	    	if(d1 > d2) return 'vencida';
	    	else return guarantee.status.status;
	    };

	    $scope.statusColor2 = function(guarantee) {
	    	/*var startDate = guarantee.startDate.split('T')[0].split('-'),
	    		endDate = guarantee.endDate.split('T')[0].split('-');

	    	if(startDate[0] > endDate[0]) return 'label-danger';
	    	if(startDate[1] > endDate[1]) return 'label-danger';
	    	if(startDate[2] > endDate[2] && startDate[0] == endDate[0]) return 'label-danger';

	      	return 'label-success';*/

	      	var d1 = new Date(guarantee.startDate), d2 = new Date(guarantee.endDate);
	    	d1.setHours(0, 0, 0, 0);
	    	d2.setHours(0, 0, 0, 0);

	    	if(d1 > d2) return 'label-danger';
	    	else return 'label-success';
	    };

    	$scope.status = function(status) {

	  		if(status == 'activada')
	  			return 'label-success';
	  		else
	  			return 'label-default';

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

	    $scope.gender = function(gender) {
	    	if(gender == 'M') return 'MASCULINO';
	    	return 'FEMENINO';
	    };

	    $scope.age = function(date) {
	    	var today = new Date();
	    	date = date.split('T')[0].split('-');
	      	var yyyy = date[0], mm = date[1], dd = date[2];

	      	var age = today.getFullYear() - yyyy;

	      	var aux1 = today.getMonth() + 1 - mm, aux2 = today.getDay() - dd;

	      	if(aux1 > 0 || (aux1 == 0 && aux2 >= 0)) age++;

	      	return age;
	    };

	    $scope.detail = function(id) {
	    	$state.go(
		        'main.home.loaddata.requestdetail', {
		    		id: id
		    	}    
		    );
	    };

	    $scope.canCancel = function() {
	    	if(!$scope.history)
	    		return false;
	    	for(var i = 0; i < $scope.history.length; i++) {
	    		if($scope.history[i].status.id == 2 && $scope.history[i].analystId == $scope.user.userId) return true;
	    	}
	    	return false;
	    };

	    $scope.cancelRequest = function() {

	    	var aux, auxi;

	    	for(var i = 0; i < $scope.history.length; i++) {
	    		if($scope.history[i].status.id == 2) {
	    			auxi = i;
	    			aux = $scope.history[i].id;
	    			break;
	    		};
	    	}

	    	var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/confirmation.html',
                controller: 'ConfirmationCtrl',
                size: 'md',
                resolve: {
                    data: function() {
                        return {
                            msg: '¿Está seguro de cancelar la solicitud de Visita Clínica #' + aux + '?'
                        };
                    }
                }
            });

            modalInstance.result.then(function(flag) {
                request.delete(aux).then(function(response) {
		    		toastr.success('Solicitud de visita cancelada con éxito.', 'Listo');
		    		$state.go($state.current, {}, {reload: true});
		    	}, function(response) {
		    		toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
		    		//console.log(response);
		    	});
            }, function(flag) {
                console.log('Modal dismissed at: ' + new Date());
            });

	    };

	    $scope.canRequest = function() {

	    	var d1 = new Date($scope.guaranteeLetter.startDate),
	    		d2 = new Date($scope.guaranteeLetter.endDate);
	    	d1.setHours(0, 0, 0, 0);
	    	d2.setHours(0, 0, 0, 0);

	    	if(d1 > d2) return false;

	    	if(!$scope.history)
	    		return true;
	    	
	    	for(var i = 0; i < $scope.history.length; i++) {
	    		if($scope.history[i].status.id != 6) return false;
	    	}

	    	return true;
	    };

	    $scope.postRequest = function() {

	    	var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/requestmodal.html',
                controller: 'RequestmodalCtrl',
                size: 'md'
            });

            modalInstance.result.then(function(data) {

		    	request.postRequest({
		    		guaranteeLetterId: $scope.guaranteeLetter.id,
		    		comment: data.comment,
		    		endDate: data.date
		    	})
		    	.then(function(response) {
		    		if(response.data.created) {
		    			toastr.warning('Otro analista acaba de solicitar una visita para esta carta aval.', 'Atención');
		    		} else {
		    			toastr.success('Solicitud de visita generada con éxito.', 'Listo');
		    		}
		    		$scope.guaranteeLetter.request = {
		    			id: response.data.id,
		    			guaranteeLetterId: response.data.guaranteeLetterId,
		    			statusId: response.data.statusId,
		    			coordinatorId: response.data.coordinatorId,
		    			visitorId: response.data.visitorId,
		    			analystId: response.data.analystId,
		    			formId: response.data.formId,
		    			startDate: response.data.startDate,
		    			endDate: response.data.endDate,
		    			status: response.data.status
		    		};

		    		if(!$scope.history)
		    			$scope.history = [$scope.guaranteeLetter.request];
		    		else
		    			$scope.history.push($scope.guaranteeLetter.request);
		    		$rootScope.statusGroups = response.data.statusGroups;
		    	}, function(response) {
		    		if(response.status == 500) {
				        toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
				    }
		    	});

			}, function() {
			   	console.log('Modal dismissed at: ' + new Date());
			});

	    };

  	});
