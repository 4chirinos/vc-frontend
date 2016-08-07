'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:SurveyCtrl
 * @description
 * # SurveyCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('SurveyCtrl', function (budget, survey) {
    	
  		console.log('survey');
  		console.log(budget + ' ' + survey);
  		
  	});
