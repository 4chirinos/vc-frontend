'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:SurveyCtrl
 * @description
 * # SurveyCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('SurveyCtrl', function ($scope, $stateParams, toastr, session, response, formData, survey) {

  		$scope.user = session.getCurrentUser();

      $scope.form = formData.data.form;

      $scope.values = [];

      for(var i = 0; i < $scope.form.question.length; i++) {
        if($scope.form.question[i].answer) {
          $scope.values[i] = $scope.form.question[i].answer.answer;
        }
      }

      $scope.loadData = function() {
        var data = [];

        for(var i = 0; i < $scope.form.question.length; i++) {
          data.push({requestId: $stateParams.id, questionId: $scope.form.question[i].id, answer: $scope.values[i]});
        }

        survey.postAnswer($stateParams.id, data).then(function(response) {
          //console.log(response.data);
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
  				return true;
  			}
	    	return true;
  		};

  	});
