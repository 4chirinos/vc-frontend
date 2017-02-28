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

    budget.getCurrentBudget = function(id, obj) {
      return vcrestangular.all('budget/' + id + '/currentBudget')
      .get('', obj, {token: localStorageService.get('token')});
    };

    budget.getByRequestId = function(id) {
      return vcrestangular.all('budget').get('', {requestId: id}, {token: localStorageService.get('token')});
    };

    budget.postBudget = function(obj) {
      return vcrestangular.all('budget').post(obj, {}, {token: localStorageService.get('token')});
    };

    budget.postDocument = function(id, files) {

      var fd = new FormData();

      for(var i = 0; i < files.length; i++) {
        fd.append('file', files[i]);
      }

      return vcrestangular.one('budget/' + id + '/document')
      .withHttpConfig({transformRequest: angular.identity})
      .customPOST(fd, '', {}, {'Content-Type': undefined, token: localStorageService.get('token')})

    };

    budget.getAll = function(obj) {
      return vcrestangular.all('budget2').get('', obj, {token: localStorageService.get('token')});
    };

    return budget;

  });
