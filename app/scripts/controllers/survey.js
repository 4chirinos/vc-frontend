'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:SurveyCtrl
 * @description
 * # SurveyCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('SurveyCtrl', function (budgetData, surveyData) {
    	
  		console.log('survey');
  		console.log(budgetData + ' ' + surveyData);
  		
  	});
