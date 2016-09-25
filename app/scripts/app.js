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
	    			response: function($rootScope, $stateParams, request) {

	    				if($rootScope.obj && $rootScope.obj.fill) {
	    					return request.getRequest($rootScope.obj).then(function(response) {
					    		return response;
						  	}, function(response) {
						  		return response;
						  	});
	    				} else {
	    					return request.getRequest({page: 1, pageSize: 6, statusId: $stateParams.filter}).then(function(response) {
					    		return response;
						  	}, function(response) {
						  		return response;
						  	});
	    				}

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
	    		controller: 'RequestdetailCtrl',
	    		resolve: {
	    			comments: function($stateParams, request) {
	    				return request.getComments($stateParams.id).then(function(response) {
	    					return response;
	    				}, function(response) {
	    					return response;
	    				});
	    			}
	    		}
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
	    			formData: function($stateParams, request) {
	    				return request.getForm($stateParams.id)
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
	    		controller: 'DecisionCtrl',
	    		resolve: {
	    			comments: function($stateParams, request) {
	    				return request.getComments($stateParams.id).then(function(response) {
	    					return response;
	    				}, function(response) {
	    					return response;
	    				});
	    			}
	    		}
	    	})
	    	.state('main.home.guaranteeletterlist', {
	    		url: '/cartaaval?guaranteeId&status&firstName&lastName&BidentityCard',
	    		templateUrl: 'views/guaranteelist.html',
	    		controller: 'GuaranteelistCtrl',
	    		resolve: {
	    			response: function($stateParams, guaranteeletter) {

	    				var obj = {
			  				status: $stateParams.status,
			  				guaranteeId: $stateParams.guaranteeId,
			  				firstName: $stateParams.firstName,
			  				lastName: $stateParams.lastName,
			  				BidentityCard: $stateParams.BidentityCard,
			  				page: 1,
			  				pageSize: 6
			  			};

		    			return guaranteeletter.getGuaranteeQS(obj).then(function(response) {
			  				return response;
			  			}, function(response) {
			  				return response;
			  			});
			  		}
	    		}
	    	})
	    	.state('main.home.guaranteeletterdetail', {
	    		url: '/cartaaval/:id/detalles',
	    		templateUrl: 'views/guaranteeletterdetail.html',
	    		controller: 'GuaranteeletterdetailCtrl',
	    		resolve: {
	    			response: function($stateParams, guaranteeletter) {
	    				return guaranteeletter.getGuaranteeLetterById($stateParams.id).then(function(response) {
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
