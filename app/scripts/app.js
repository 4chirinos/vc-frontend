'use strict';

/**
 * @ngdoc overview
 * @name frontend2App
 * @description
 * # frontend2App
 *
 * Main module of the application.
 */
angular
	.module('frontend2App', [
    	'ngAnimate',
    	'ngSanitize',
	    'ngTouch',
	    'ui.router',
	    'restangular',
	    'toastr',
	    'angular-loading-bar',
	    'ui.bootstrap',
	    'LocalStorageModule'
  	])
  	.config(function($stateProvider, $urlRouterProvider) {

	  	$urlRouterProvider.otherwise('VCWebApp');

	  	$stateProvider
	  		.state('VCWebApp', {
	        	url: '/VCWebApp',
	        	controller: 'InitCtrl'
	    	})
	    	.state('login', {
	        	url: '/login',
	        	templateUrl: 'views/login.html',
	        	controller: 'LoginCtrl'
	    	})
	    	.state('main', {
	    		url: '/',
	    		templateUrl: 'views/main.html',
	    		abstract: true
	    	})
	    	.state('main.home', {
	    		url: 'inicio',
	    		templateUrl: 'views/home.html',
	    		controller: 'HomeCtrl',
	    		abstract: true
		    })
	    	.state('main.home.requestlist', {
	    		url: '/solicitud',
	    		templateUrl: 'views/requestlist.html',
	    		controller: 'RequestlistCtrl',
	    		resolve: {
	    			response: function(request) {
	    				return request.getRequest(1, 10).then(function(response) {
				    		return response;
					  	}, function(response) {
					  		return response;
					  	});
	    			}
	    		}
	    	})
	    	.state('main.home.requestdetail', {
	    		url: '/solicitud/:id',
	    		templateUrl: 'views/requestdetail.html',
	    		controller: 'RequestdetailCtrl',
	    		resolve: {
	    			response: function($stateParams, request) {
	    				return request.getById($stateParams.id)
	    				.then(function(response) {
	    					return response;
	    				}, function(response) {
	    					return response;
	    				});
	    			}
	    		}
	    	})
	    	.state('main.home.loaddata', {
	    		url: '/cargardatos/:id',
	    		templateUrl: 'views/loaddata.html',
	    		abstract: true,
	    		resolve: {
	    			budget: function($stateParams) {
	    				return 'budget' + $stateParams.id;
	    			},
	    			survey: function($stateParams) {
	    				return 'survey' + $stateParams.id;
	    			}
	    		}
	    	})
	    	.state('main.home.loaddata.budget', {
	    		url: '/presupuesto',
	    		templateUrl: 'views/budget.html',
	    		controller: 'BudgetCtrl'
	    	})
	    	.state('main.home.loaddata.survey', {
	    		url: '/encuesta',
	    		templateUrl: 'views/survey.html',
	    		controller: 'SurveyCtrl'
	    	})
	    	.state('main.home.guaranteeletterdetail', {
	    		url: '/cartaaval/detalles',
	    		templateUrl: 'views/guaranteeletterdetail.html',
	    		controller: 'GuaranteeletterdetailCtrl',
	    		params: {
	    			guaranteeletter: null
	    		}
	    	});

  	})
	.config(function (localStorageServiceProvider) {
	  	localStorageServiceProvider
		.setPrefix('VCWebApp');
	})
	.run(function($state) {
	  	$state.go('login');
	});