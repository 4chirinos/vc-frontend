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
	    'LocalStorageModule',
	    'file-model'
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
	    		params: {
	    			filter: ''
	    		},
	    		resolve: {
	    			response: function($stateParams, request) {
	    				return request.getRequest(1, 10, $stateParams.filter).then(function(response) {
				    		return response;
					  	}, function(response) {
					  		return response;
					  	});
	    			}
	    		}
	    	})
	    	.state('main.home.loaddata', {
	    		url: '/solicitud/:id/cargardatos',
	    		templateUrl: 'views/loaddata.html',
	    		controller: 'LoaddataCtrl',
	    		abstract: true,
	    		resolve: {
	    			response: function($rootScope, $stateParams, request) {
	    				return request.getById($stateParams.id)
	    				.then(function(response) {
	    					$rootScope.statusGroups = response.data.statusGroups;
	    					return response;
	    				}, function(response) {
	    					return response;
	    				});
	    			}
	    		}
	    	})
	    	.state('main.home.loaddata.requestdetail', {
	    		url: '/detalles',
	    		templateUrl: 'views/requestdetail.html',
	    		controller: 'RequestdetailCtrl'
	    	})
	    	.state('main.home.loaddata.budget', {
	    		url: '/presupuesto',
	    		templateUrl: 'views/budget.html',
	    		controller: 'BudgetCtrl',
	    		resolve: {
	    			budgetData: function($stateParams, budget) {
	    				return budget.getByRequestId($stateParams.id)
	    				.then(function(response) {
	    					return response;
	    				}, function(response) {
	    					return response;
	    				});
	    			}
	    		}
	    	})
	    	.state('main.home.loaddata.survey', {
	    		url: '/encuesta',
	    		templateUrl: 'views/survey.html',
	    		controller: 'SurveyCtrl',
	    		resolve: {
	    			surveyData: function($stateParams, survey) {
	    				return survey.getByRequestId($stateParams.id)
	    				.then(function(response) {
	    					return response;
	    				}, function(response) {
	    					return response;
	    				});
	    			}
	    		}
	    	})
	    	.state('main.home.loaddata.attached', {
	    		url: '/adjunto',
	    		templateUrl: 'views/attached.html',
	    		controller: 'AttachedCtrl'
	    	})
	    	.state('main.home.loaddata.decision', {
	    		url: '/accion',
	    		templateUrl: 'views/decision.html',
	    		controller: 'DecisionCtrl'
	    	})
	    	.state('main.home.guaranteeletterdetail', {
	    		url: '/cartaaval/:code/detalles',
	    		templateUrl: 'views/guaranteeletterdetail.html',
	    		controller: 'GuaranteeletterdetailCtrl',
	    		resolve: {
	    			response: function($stateParams, guaranteeletter) {
	    				return guaranteeletter.getGuaranteeLetter({code: $stateParams.code}).then(function(response) {
	    					return response;
			          	}, function(response) {
			            	return response;
			          	});
	    			}
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
