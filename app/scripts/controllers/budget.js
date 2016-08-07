'use strict';

/**
 * @ngdoc function
 * @name frontend2App.controller:BudgetCtrl
 * @description
 * # BudgetCtrl
 * Controller of the frontend2App
 */
angular.module('frontend2App')
  	.controller('BudgetCtrl', function (budget, survey) {
    	
    	console.log('budget');
    	console.log(budget + ' ' + survey);

  	});
