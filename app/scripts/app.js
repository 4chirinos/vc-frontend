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
	    'file-model',
	    'thatisuday.ng-image-gallery'
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
		    .state('main.home.config', {
	    		url: '/configuracion',
	    		templateUrl: 'views/userconfiguration.html',
	    		controller: 'UserconfigurationCtrl'
		    })
	    	.state('main.home.requestlist', {
	    		url: '/solicitud?statusId&guaranteeLetterId&requestId&sd1&sd2', /*'/cartaaval?guaranteeId&status&firstName&lastName&BidentityCard'*/
	    		templateUrl: 'views/requestlist.html',
	    		controller: 'RequestlistCtrl',
	    		params: {
	    			filter: ''
	    		},
	    		resolve: {
	    			response: function($rootScope, $stateParams, request) {

	    				var obj = {
					    	guaranteeLetterId: $stateParams.guaranteeLetterId,
					        requestId: $stateParams.requestId,
					        statusId: $stateParams.statusId,
					        page: 1,
					        pageSize: 6,
					        sd1: $stateParams.sd1,
					        sd2: $stateParams.sd2
					    };

	    				return request.getRequestQS(obj).then(function(response) {
					    	return response;
						}, function(response) {
						  	return response;
						});

	    			}
	    		}
	    	})
	    	.state('main.home.userlist', {
	    		url: '/usuario',
	    		templateUrl: 'views/userlist.html',
	    		controller: 'UserlistCtrl'
	    	})
	    	.state('main.home.dbfiles', {
	    		url: '/cargardatos',
	    		templateUrl: 'views/loaddbfiles.html',
	    		controller: 'LoaddbfilesCtrl'
	    	})
	    	.state('main.home.personlist', {
	    		url: '/persona?identityCard&firstName&lastName&profileId&stateId',
	    		templateUrl: 'views/personlist.html',
	    		controller: 'PersonlistCtrl',
	    		resolve: {
	    			response: function($stateParams, person) {

	    				var obj = {
					    	identityCard: $stateParams.identityCard,
					        firstName: $stateParams.firstName,
					        lastName: $stateParams.lastName,
					        profileId: $stateParams.profileId,
					        stateId: $stateParams.stateId,
					        page: 1,
					        pageSize: 6
					    };

	    				return person.getPersonQS(obj)
	    				.then(function(response) {
	    					return response;
	    				}, function(response) {
	    					return response;
	    				});
	    			}
	    		}
	    	})
	    	.state('main.home.persondetail', {
	    		url: '/persona/:id/detalles',
	    		templateUrl: 'views/persondetail.html',
	    		controller: 'PersondetailCtrl',
	    		resolve: {
	    			response: function($stateParams, person) {
	    				return person.getPersonById($stateParams.id).then(function(response) {
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
	    		abstract: true,
	    		resolve: {
	    			budgetData: function($stateParams, budget) {
	    				return budget.getCurrentBudget($stateParams.id, {page: 1, pageSize: 1})
	    				.then(function(response) {
	    					return response;
	    				}, function(response) {
	    					return response;
	    				});
	    			},
	    			lastCurrentBudget: function($stateParams, budget) {
	    				return budget.getCurrentBudget($stateParams.id, {pageSize: 1, lastPage: true})
	    				.then(function(response) {
	    					return response;
	    				}, function(response) {
	    					return response;
	    				});
	    			}
	    		}
	    	})
	    	.state('main.home.loaddata.budget.originalbudget', {
	    		url: '/original',
	    		templateUrl: 'views/originalbudget.html',
	    		controller: 'BudgetCtrl'
	    	})
	    	.state('main.home.loaddata.budget.currentbudget', {
	    		url: '/modificado',
	    		templateUrl: 'views/currentbudget.html',
	    		controller: 'BudgetCtrl'
	    	})
	    	.state('main.home.loaddata.survey', {
	    		url: '/encuesta',
	    		templateUrl: 'views/survey.html',
	    		controller: 'SurveyCtrl',
	    		resolve: {
	    			formData: function($stateParams, request) {
	    				return request.getForm($stateParams.id, {lastPage: true})
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
	    		url: '/cartaaval?guaranteeId&statusId&requestId&firstName&lastName&BidentityCard&policyId',
	    		templateUrl: 'views/guaranteelist.html',
	    		controller: 'GuaranteelistCtrl',
	    		resolve: {
	    			response: function($stateParams, guaranteeletter) {

	    				/*var obj = {
			  				statusId: $stateParams.statusId,
			  				page: 1,
			  				pageSize: 6
			  			};*/

			  			var params = {
				          guaranteeId: $stateParams.guaranteeId,
				          requestId: $stateParams.requestId,
				          statusId: $stateParams.selectedFilter,
				          policyId: $stateParams.policyId,
				          firstName: $stateParams.firstName,
				          lastName: $stateParams.lastName,
				          BidentityCard: $stateParams.BidentityCard,
				          page: 1,
				          pageSize: 6
				        };

		    			return guaranteeletter.getGuaranteeQS(params).then(function(response) {
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
	    	})
	    	.state('main.home.affiliatedlist', {
	    		url: '/clinicas?name&rif&stateId',
	    		templateUrl: 'views/affiliatedlist.html',
	    		controller: 'AffiliatedlistCtrl',
	    		resolve: {
	    			response: function($stateParams, affiliated) {

	    				var params = {
				          name: $stateParams.name,
				          rif: $stateParams.rif,
				          stateId: $stateParams.stateId,
				          page: 1,
				          pageSize: 6
				        };

	    				return affiliated.getAll(params).then(function(response) {
	    					return response;
	    				}, function(response) {
	    					return response;
	    				});
	    			}
	    		}
	    	})
	    	.state('main.home.affiliateddetail', {
	    		url: '/clinica/:id/detalles',
	    		templateUrl: 'views/affiliateddetail.html',
	    		controller: 'AffiliatedetailCtrl',
	    		resolve: {
	    			response: function($stateParams, affiliated) {
	    				return affiliated.getById($stateParams.id).then(function(response) {
	    					return response;
			          	}, function(response) {
			            	return response;
			          	});
	    			}
	    		}
	    	})
	    	.state('main.home.budgetlist', {
	    		url: '/presupuestos?code&firstName&lastName&identityCard',
	    		templateUrl: 'views/budgetlist.html',
	    		controller: 'BudgetlistCtrl',
	    		resolve: {
	    			response: function($stateParams, budget) {

	    				var params = {
				         	page: 1,
				          	pageSize: 6,
				          	code: $stateParams.code,
				          	firstName: $stateParams.firstName,
				          	lastName: $stateParams.lastName,
				          	identityCard: $stateParams.identityCard
				        };

	    				return budget.getAll(params).then(function(response) {
	    					return response;
	    				}, function(response) {
	    					return response;
	    				});

	    			}
	    		}
	    	})
	    	.state('main.home.admin', {
	    		url: '/presupuesto/:id',
	    		templateUrl: 'views/adminbudget.html',
	    		controller: 'AdminbudgetCtrl',
	    		abstract: true,
	    		resolve: {
	    			response: function($stateParams, budget) {
	    				return budget.getById($stateParams.id)
	    				.then(function(response) {
	    					return response;
	    				}, function(response) {
	    					return response;
	    				});
	    			}
	    		}
	    	})
	    	.state('main.home.admin.infobudget', {
	    		url: '/detalles',
	    		templateUrl: 'views/budgetdetail.html',
	    		controller: 'BudgetdetailCtrl'
	    	})
	    	.state('main.home.admin.databudget', {
	    		url: '/gastos',
	    		templateUrl: 'views/adminbudgetdata.html',
	    		controller: 'AdminbudgetCtrl'
	    	});

  	})
	.config(function (localStorageServiceProvider) {
	  	localStorageServiceProvider
		.setPrefix('VCWebApp');
	})
	.run(function($rootScope, $state, session) {
	  	$state.go('login');
	});
