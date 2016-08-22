'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:AttachedCtrl
 * @description
 * # AttachedCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
	.controller('AttachedCtrl', function ($scope, $stateParams, $rootScope, toastr, budgetData, surveyData, budget, survey, request) {

    	$scope.budgetFiles = []; 
        $scope.surveyFiles = [];

        var aux = budgetData.data.paths.split('$');
        aux.length--;
        $scope.budgetPaths = aux;

        aux = surveyData.data.paths.split('$');
        aux.length--;
        $scope.surveyPaths = aux;

        $scope.loadable = function() {
            if($scope.budgetFiles.length >= 1 && $scope.surveyFiles.length >= 1)
                return false;
            return true;
        };

        $scope.loadData = function() {
            budget.postDocument(budgetData.data.id, $scope.budgetFiles)
            .then(function(response1) {

                budgetData.data.paths = response1.data.paths;

                var aux1 = response1.data.paths.split('$');
                aux1.length--;

                survey.postDocument(surveyData.data.id, $scope.surveyFiles)
                .then(function(response2) {

                    $scope.budgetFiles = []; 
                    $scope.surveyFiles = [];

                    surveyData.data.paths = response2.data.paths;

                    var aux2 = response2.data.paths.split('$');
                    aux2.length--;

                    $scope.budgetPaths = aux1;
                    $scope.surveyPaths = aux2;

                    toastr.success('Carga hecha con éxito.', 'Listo');

                }, function(response2) {
                    toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
                });

            }, function(response1) {
                toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
            });
        };

        $scope.viewImage = function(file) {
            window.open('http://localhost:3000/api/v1/image/' + file);
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
            console.log(index);
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
            console.log(index);
            $scope.surveyFiles.splice(index, 1);
        };

        $scope.surveyUpload = function(){
            angular.element('#upload2').trigger('click');
        };

  	});
