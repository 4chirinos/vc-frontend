'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:DecisionCtrl
 * @description
 * # DecisionCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('DecisionCtrl', function ($scope, $stateParams, $rootScope, $uibModal, toastr, session, request, comment, response, comments) {
    	
  		$scope.user = session.getCurrentUser();

        $scope.comments = comments.data.comment;

        //var x = $('#box').scrollTop($('#box')[0].scrollHeight);

        //console.log(x);

        /*if(response.data.status.status == 'atendida') {
            $scope.info = 'Esperando por revisión del coordinador.'
        } else if(response.data.status.status == 'en revision') {
            $scope.info = 'Revisión solicitada por el coordinador.'
        }*/

        $scope.infoClass = function() {
            if(response.data.status.status == 'atendida') return 'alert-info';
            if(response.data.status.status == 'en revision') return 'alert-danger';
            if(response.data.status.status == 'asignada') return 'alert-danger';
            if(response.data.status.status == 'finalizada') return 'alert-success';
        };

        $scope.showInfo = function() {
            return true;
        };

        $scope.info = function() {
            if($scope.user.userProfile == 'visitador') {
                if(response.data.status.status == 'atendida') {
                    return 'Solicitud atendida.';
                } else if(response.data.status.status == 'en revision') {
                    return 'Solicitud de visita en revisión.';
                } else if(response.data.status.status == 'asignada') {
                    return 'Solicitud de visita pendiente.';
                }
            }
            if($scope.user.userProfile == 'coordinador') {
                if(response.data.status.status == 'atendida') {
                    return 'Solicitud atendida.';
                } else if(response.data.status.status == 'en revision') {
                    return 'Solicitud de visita en revisión.';
                } else if(response.data.status.status == 'finalizada') {
                    return 'Solicitud de visita completada.';
                }
            }
        }

        $scope.canAuthorize = function() {
            if(response.data.status.status == 'atendida') return true;
        };

        $scope.canReview = function() {
            if(response.data.status.status == 'atendida') return true;
        };

        $scope.showButton = function() {
            if($scope.user.userProfile == 'visitador') {
                if(response.data.status.status == 'asignada' || response.data.status.status == 'en revision') return true;
            }
        };

        $scope.date = function(date) {
            date = date.split('T')[0].split('-');
            var yyyy = date[0], mm = date[1], dd = date[2];
            return dd + '/' + mm + '/' + yyyy;
        };

        $scope.hour = function(date) {
            console.log(date);
            date = date.split('T')[1].split(':');
            console.log(date);
            var hour = date[0] + ':' + date[1];
            return hour;
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
                    response.data = response1.data;
                    response.data.status = response1.data.status;
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
