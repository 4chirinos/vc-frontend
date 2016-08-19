'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:AttachedCtrl
 * @description
 * # AttachedCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
	.controller('AttachedCtrl', function ($scope, toastr, budgetData, budget) {
    	
    	$scope.budgetFiles = []; 
        $scope.surveyFiles = [];
        var aux = budgetData.data.paths.split('$');
        aux.length--;
        $scope.budgetPaths = aux;

        $scope.loadable = function() {
            if($scope.budgetFiles.length >= 1 && $scope.surveyFiles.length >= 1)
                return false;
            return true;
        };

        $scope.loadData = function() {
            budget.postDocument(budgetData.data.id, $scope.budgetFiles)
            .then(function(response) {
                budgetData.data.paths = response.data.paths;
                var aux = response.data.paths.split('$');
                aux.length--;
                $scope.budgetPaths = aux;
            }, function(response) {
                console.log(response);
            });
        };

        $scope.viewImage = function(file) {
            window.open('http://localhost:3000/api/v1/image/budget/' + file);
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
