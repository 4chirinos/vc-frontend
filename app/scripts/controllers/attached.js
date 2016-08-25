'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:AttachedCtrl
 * @description
 * # AttachedCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
	.controller('AttachedCtrl', function ($scope, $stateParams, $rootScope, toastr, response, request, baseUrl) {

    	$scope.budgetFiles = []; 
        $scope.surveyFiles = [];

        $scope.budgetPaths = response.data.budgetImage;
        $scope.surveyPaths = response.data.formImage;

        $scope.loadable = function() {
            if($scope.budgetFiles.length >= 1 && $scope.surveyFiles.length >= 1)
                return false;
            return true;
        };

        $scope.loadData = function() {
            request.postBudgetImage(response.data.id, $scope.budgetFiles)
            .then(function(response1) {

                response.data.budgetImage = response1.data.path;

                request.postFormImage(response.data.id, $scope.surveyFiles)
                .then(function(response2) {

                    $scope.budgetFiles = []; 
                    $scope.surveyFiles = [];

                    $scope.budgetPaths = response1.data.path;
                    $scope.surveyPaths = response2.data.path;

                    response.data.formImage = response2.data.path;

                    toastr.success('Carga hecha con éxito.', 'Listo');

                }, function(response2) {
                    toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
                });

            }, function(response1) {
                toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
            });
        };

        $scope.viewImage = function(file) {
            window.open(baseUrl + '/image/' + file);
        };

    	$scope.budgetLoaded = function(file) {
            if(file.size <= 2099734) {
                $scope.$apply(function() {
                    $scope.budgetFiles.push(file);
                });
            } else {
                console.log('Más de 2 MB');
                toastr.error('La imagen seleccionada supera los 2 MB.', 'Error');
            }
        };

        $scope.removeBudget = function(index) {
            $scope.budgetFiles.splice(index, 1);
        };

        $scope.budgetUpload = function(){
            angular.element('#upload1').trigger('click');
        };

        $scope.surveyLoaded = function(file) {
            if(file.size <= 2099734) {

                $scope.$apply(function() {
                    $scope.surveyFiles.push(file);
                });
                
            } else {
                console.log('Más de 2 MB');
            }

        };

        $scope.removeSurvey = function(index) {
            $scope.surveyFiles.splice(index, 1);
        };

        $scope.surveyUpload = function(){
            angular.element('#upload2').trigger('click');
        };

  	});
