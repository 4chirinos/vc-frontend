'use strict';

/**
 * @ngdoc service
 * @name frontend2App.budget
 * @description
 * # budget
 * Factory in the frontend2App.
 */
angular.module('frontend2App')
  .factory('budget', function (vcrestangular, localStorageService) {
    
    var budget = {};

    budget.getById = function(id) {
      return vcrestangular.all('budget').get(id, {}, {token: localStorageService.get('token')});
    };

    budget.getByRequestId = function(id) {
      return vcrestangular.all('budget').get('', {requestId: id}, {token: localStorageService.get('token')});
    };

    budget.postRequest = function(obj) {
        return vcrestangular.all('budget/document').post(obj, {}, {token: localStorageService.get('token')});
    };

    return budget;

  });
