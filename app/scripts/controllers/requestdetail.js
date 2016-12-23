'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:RequestdetailCtrl
 * @description
 * # RequestdetailCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('RequestdetailCtrl', function ($rootScope, $scope, $stateParams, $uibModal, $state, toastr, session, user, request, budget, response, baseUrl, comment, comments) {
    	
    	var pageSize = 10;

    	$scope.user = session.getCurrentUser();
    	$scope.request = response.data;
    	$scope.comments = comments.data.comment;

    	$scope.downloadBudget = function() {
  			window.open(baseUrl + '/document/budget/' + $scope.request.guaranteeLetter.budget.id);
  		};

  		$scope.downloadGuarantee = function() {
  			window.open(baseUrl + '/document/guaranteeLetter/' + $scope.request.guaranteeLetterId);
  		};

        $scope.downloadSurvey = function() {
            window.open(baseUrl + '/document/form/request/' + $scope.request.id);
        };

  		$scope.load = function() {
  			$state.go(
		        'main.home.loaddata.budget', {
		        	id: $scope.request.id
		        }
		    );
  		};

  		$scope.assign = function() {

	  		user.getVisitors(1, pageSize).then(function(response) {
	    		
	  			var modalInstance = $uibModal.open({
			      	animation: true,
			      	templateUrl: 'views/assignvisitormodal.html',
			      	controller: 'AssignvisitormodalCtrl',
			      	size: 'lg',
			      	resolve: {
			        	data: function () {
			          		return response.data;
			        	}
			      	}
		    	});

		  		modalInstance.result.then(function(data) {
                    var visitor = data.visitor, coment = data.coment;
                    //console.log(coment);
                    if(coment) {
                        comment.post({requestId: $stateParams.id, comment: coment}).then(function(response1) {
                            
                            request.getComments($stateParams.id).then(function(r2) {
                                $scope.comments = r2.data.comment;
                            }, function(r2) {
                                console.log('error trayendo la lista de observaciones');
                            });

                            //comments.data.comment.push(response1.data);
                        }, function(response1) {
                            console.log('error 500 con la observación');
                        });
                    }

		  			request.partialUpdate({id: $scope.request.id, visitorId: visitor.id, statusId: 3}).then(function(response) {
		  				if(response.data.created) {
		  					toastr.warning('Otro coordinador acaba de asignar esta visita.', 'Atención');
		  				} else {
		  					toastr.success('Asignación hecha con éxito.', 'Listo');
		  				}
		  				$scope.request = response.data;
		  				$rootScope.statusGroups = response.data.statusGroups;
		  			}, function(response) {
		  				if(response.status == 500) {
			          		toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
			        	}
		  			});

			    }, function() {
			    	console.log('Modal dismissed at: ' + new Date());
			    });

		  	}, function(response) {
		  		if(response.status == 500) {
	          		toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
	        	}
		  	});

	  	};

		$scope.gender = function(gender) {
		   	if(gender == 'M') return 'Masculino';
		    return 'Femenino';
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

        $scope.age = function(date) {
            var today = new Date();
            date = date.split('T')[0].split('-');
            var yyyy = date[0], mm = date[1], dd = date[2];

            var age = today.getFullYear() - yyyy;

            var aux1 = today.getMonth() + 1 - mm, aux2 = today.getDay() - dd;

            if(aux1 > 0 || (aux1 == 0 && aux2 >= 0)) age++;

            return age;
        };

        $scope.hour = function(date) {
            var currentdate = new Date(date);
			
			var datetime = "Last Sync: " + currentdate.getDate() + "/"
				+ (currentdate.getMonth() + 1)  + "/" 
				+ currentdate.getFullYear() + " @ "  
				+ currentdate.getHours() + ":"  
				+ currentdate.getMinutes() + ":" 
				+ currentdate.getSeconds();

	      	return currentdate.getHours() + ':' + currentdate.getMinutes(); 
        };

        $scope.info = function() {
            if($scope.user.userProfile == 'visitador') {
                if($scope.request.status.status == 'atendida') {
                    return 'Solicitud atendida.';
                } else if($scope.request.status.status == 'en revision') {
                    return 'Solicitud de visita en revisión.';
                } else if($scope.request.status.status == 'asignada') {
                    return 'Solicitud de visita pendiente.';
                } else if($scope.request.status.status == 'finalizada') {
                    return 'Solicitud de visita completada.';
                }
            }
            if($scope.user.userProfile == 'coordinador') {
                if($scope.request.status.status == 'atendida') {
                    return 'Solicitud atendida.';
                } else if($scope.request.status.status == 'en revision') {
                    return 'Solicitud de visita en revisión.';
                } else if($scope.request.status.status == 'finalizada') {
                    return 'Solicitud de visita completada.';
                } else if($scope.request.status.status == 'por asignar') {
                	return 'Solicitud de visita por asignar.';
                } else if($scope.request.status.status == 'asignada') {
                	return 'Solicitud de visita asignada.';
                }
            }
            if($scope.user.userProfile == 'analista') {
                if($scope.request.status.status == 'atendida') {
                    return 'Solicitud atendida.';
                } else if($scope.request.status.status == 'en revision') {
                    return 'Solicitud de visita en revisión.';
                } else if($scope.request.status.status == 'finalizada') {
                    return 'Solicitud de visita completada.';
                } else if($scope.request.status.status == 'por asignar') {
                	return 'Solicitud de visita por asignar.';
                } else if($scope.request.status.status == 'asignada') {
                    return 'Solicitud por atender.'
                }
            }
        };

        $scope.infoClass = function() {
            if($scope.request.status.status == 'atendida') return 'alert-info';
            if($scope.request.status.status == 'en revision') return 'alert-danger';
            if($scope.request.status.status == 'asignada') return 'alert-danger';
            if($scope.request.status.status == 'finalizada') return 'alert-success';
            if($scope.request.status.status == 'por asignar') return 'alert-danger';
        };

        $scope.canReview = function() {
            if($scope.request.status.status == 'atendida') return true;
            return false;
        };

        $scope.showButton = function() {
            if($scope.request.status.status == 'asignada' || $scope.request.status.status == 'en revision')
            	return true;
            return false;
        };

        $scope.canAssign = function() {
        	if($scope.request.status.status == 'por asignar') return true;
        };

        $scope.finish = function() {
            
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/comment.html',
                controller: 'CommentCtrl',
                size: 'md'
            });

            modalInstance.result.then(function(coment) {

                if(coment) {
                    comment.post({requestId: $stateParams.id, comment: coment}).then(function(response1) {
                        
                        request.getComments($stateParams.id).then(function(r2) {
                            $scope.comments = r2.data.comment;
                        }, function(r2) {
                            console.log('error trayendo la lista de observaciones');
                        });

                        //comments.data.comment.push(response1.data);
                    }, function(response1) {
                        console.log('error 500 con la observación');
                    });
                }
                
                request.partialUpdate({id: $stateParams.id, statusId: 4}).then(function(response1) {
                    $scope.request = response1.data; // DETALLE AQUI Y ABAJO. ACTUALIZAR EL SCOPE.REQUEST Y EL RESPONSE.DATA
                    response.data = response1.data;
                    toastr.success('Finalización hecha con éxito.', 'Listo');
                    $rootScope.statusGroups = response1.data.statusGroups;
                }, function(response1) {
                    toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
                });

            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });

        };

        $scope.review = function() {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/comment.html',
                controller: 'CommentCtrl',
                size: 'md'
            });

            modalInstance.result.then(function(coment) {

                if(coment) {
                    comment.post({requestId: $stateParams.id, comment: coment}).then(function(response1) {
                        request.getComments($stateParams.id).then(function(r2) {
                            $scope.comments = r2.data.comment;
                        }, function(r2) {
                            console.log('error trayendo la lista de observaciones');
                        });
                    }, function(response1) {
                        console.log('error 500 con la observación');
                    });
                }
                
                request.partialUpdate({id: $stateParams.id, statusId: 5})
                .then(function(response1) {
                    $scope.request = response1.data; // DETALLE AQUI Y ABAJO. ACTUALIZAR EL SCOPE.REQUEST Y EL RESPONSE.DATA
                    response.data = response1.data;
                    toastr.success('Envío a revisión hecho con éxito.', 'Listo');
                    $rootScope.statusGroups = response1.data.statusGroups;
                }, function(response) {
                    toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
                });

            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });

        };

        $scope.authorize = function() {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'views/comment.html',
                controller: 'CommentCtrl',
                size: 'md'
            });

            modalInstance.result.then(function(coment) {

                if(coment) {
                    comment.post({requestId: $stateParams.id, comment: coment}).then(function(response1) {
                        request.getComments($stateParams.id).then(function(r2) {
                            $scope.comments = r2.data.comment;
                        }, function(r2) {
                            console.log('error trayendo la lista de observaciones');
                        });
                    }, function(response1) {
                        console.log('error 500 con la observación');
                    });
                }
                
                request.partialUpdate({id: $stateParams.id, statusId: 6})
                .then(function(response1) {
                    $scope.request = response1.data; // DETALLE AQUI Y ABAJO. ACTUALIZAR EL SCOPE.REQUEST Y EL RESPONSE.DATA
                    response.data = response1.data;
                    toastr.success('Autorización hecha con éxito.', 'Listo');
                    $rootScope.statusGroups = response1.data.statusGroups;
                }, function(response1) {
                    toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
                });

            }, function() {
                console.log('Modal dismissed at: ' + new Date());
            });

        };

  });
