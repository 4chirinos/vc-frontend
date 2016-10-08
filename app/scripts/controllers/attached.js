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

        $scope.images1 = [];
        $scope.images2 = [];

        $scope.budgetPaths = response.data.budgetImage;
        $scope.surveyPaths = response.data.formImage;

        var updateGallery1 = function() {

            var arr = []

            for(var i = 0; i < $scope.budgetPaths.length; i++) {
                var str = $scope.budgetPaths[i].path;
                
                str = str.replace(/ /g,'%20');

                arr.push({
                    thumbUrl: baseUrl + '/image/' + str,
                    url: baseUrl + '/image/' + $scope.budgetPaths[i].path,
                    extUrl: baseUrl + '/image/' + $scope.budgetPaths[i].path
                });
            }

            $scope.images1 = arr;

        };

        var updateGallery2 = function() {

            var arr = []

            for(var i = 0; i < $scope.surveyPaths.length; i++) {
                var str = $scope.surveyPaths[i].path;
                
                str = str.replace(/ /g,'%20');

                arr.push({
                    thumbUrl: baseUrl + '/image/' + str,
                    url: baseUrl + '/image/' + $scope.surveyPaths[i].path,
                    extUrl: baseUrl + '/image/' + $scope.surveyPaths[i].path
                });
            }

            $scope.images2 = arr;

        };

        updateGallery1();
        updateGallery2();

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

                    updateGallery1();
                    updateGallery2();

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

        // gallery methods
        $scope.methods1 = {};
        $scope.methods2 = {};
         
        // so you will bind openGallery method to a button on page
        // to open this gallery like ng-click="openGallery();"
        $scope.openGallery = function(){
            $scope.methods1.open();
            $scope.methods2.open();
            
            // You can also open gallery model with visible image index
            // Image at that index will be shown when gallery modal opens
            //scope.methods.open(index); 
        };
         
        // Similar to above function
        $scope.closeGallery = function(){
            $scope.methods1.close();
            $scope.methods2.close();
        };
         
        $scope.nextImg = function(){
            $scope.methods1.next();
            $scope.methods2.next();
        };
         
        $scope.prevImg = function(){
            $scope.methods1.prev();
            $scope.methods2.prev();
        };

        $scope.disabled = function() {
            //console.log(response);
            if($scope.user.userProfile == 'visitador') {
                if(response.data.statusId == '3' || response.data.statusId == '5') {
                    return false;
                }
            }
            return true;
        };

  	});
