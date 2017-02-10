'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:SurveyCtrl
 * @description
 * # SurveyCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('SurveyCtrl', function ($scope, $stateParams, toastr, session, response, formData, survey, request) {

  		$scope.user = session.getCurrentUser();

      $scope.form = formData.data.information.form;

      $scope.values = [];

      for(var i = 0; i < $scope.form.question.length; i++) {
        if($scope.form.question[i].answer) {
          $scope.values[i] = $scope.form.question[i].answer.answer;
        }
      }

      $scope.pages = formData.data.pageCount;
      $scope.selectedPage = $scope.pages - 1;

      $scope.loadData = function() {
        var data = [];

        for(var i = 0; i < $scope.form.question.length; i++) {
          data.push({requestId: $stateParams.id, questionId: $scope.form.question[i].id, answer: $scope.values[i]});
        }

        survey.postAnswer($stateParams.id, data).then(function(response) {
          //console.log(response.data);
          toastr.success('Carga hecha con éxito.', 'Listo');
        }, function(response) {
          if(response.status == 500) {
            toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
          }
        });

      };
  		
  		$scope.disabled = function() {
  			if($scope.user.userProfile == 'visitador') {
  				if(response.data.statusId == '3' || response.data.statusId == '5') {
  					return false;
  				}
  			}
	    	return true;
  		};

      $scope.pageSelected = function(index) {
        request.getForm($stateParams.id, {page: index + 1})
        .then(function(resp) {
          $scope.form = resp.data.information.form;

          $scope.values = [];

          for(var i = 0; i < $scope.form.question.length; i++) {
            if($scope.form.question[i].answer) {
              $scope.values[i] = $scope.form.question[i].answer.answer;
            }
          }

          $scope.pages = resp.data.pageCount;
          $scope.selectedPage = $scope.pages - 1;
        }, function(resp) {
          if(resp.status == 500) {
            toastr.error('Ocurrió un error. Intente de nuevo.', 'Error');
          }
        });
      };

      $scope.previousPage = function() {
        if($scope.selectedPage - 1 >= 0) {
          $scope.selectedPage--;
          //getCurrentBudget($scope.selectedPage + 1);
          //arr = [];
        }
        else {
          console.log('extremo izquierdo');
        }
      };

      $scope.nextPage = function() {
        if($scope.selectedPage + 1 < $scope.pages) {
          $scope.selectedPage++;
          //getCurrentBudget($scope.selectedPage + 1);
          //arr = [];
        }
        else {
          console.log('extremo derecho');
        }
      };

  	});
