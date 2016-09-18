'use strict';

/**
 * @ngdoc service
 * @name frontend2App.request
 * @description
 * # request
 * Factory in the frontend2App.
 */
angular.module('frontend2App')
  .factory('request', function (vcrestangular, localStorageService) {
    
    var request = {};

    request.getRequest = function(obj) {
      return vcrestangular.all('me').get('request',
        obj,
        {token: localStorageService.get('token')});
    };

    request.getComments = function(id) {
      return vcrestangular.all('request').get(id + '/comment', {}, {token: localStorageService.get('token')});
    };

    request.postRequest = function(obj) {
        return vcrestangular.all('request').post(obj, {}, {token: localStorageService.get('token')});
    };

    request.partialUpdate = function(obj) {
      return vcrestangular.all('request/' + obj.id).patch(obj, {}, {token: localStorageService.get('token')});
    };

    request.getById = function(id) {
      return vcrestangular.all('request').get(id, {}, {token: localStorageService.get('token')});
    };

    request.postBudgetImage = function(id, files) {

      var fd = new FormData();

      for(var i = 0; i < files.length; i++) {
        fd.append('file', files[i]);
      }

      return vcrestangular.one('request/' + id + '/budget/image')
      .withHttpConfig({transformRequest: angular.identity})
      .customPOST(fd, '', {}, {'Content-Type': undefined, token: localStorageService.get('token')})

    };

    request.postFormImage = function(id, files) {

      var fd = new FormData();

      for(var i = 0; i < files.length; i++) {
        fd.append('file', files[i]);
      }

      return vcrestangular.one('request/' + id + '/form/image')
      .withHttpConfig({transformRequest: angular.identity})
      .customPOST(fd, '', {}, {'Content-Type': undefined, token: localStorageService.get('token')})

    };

    request.getRequestQS = function(obj) {
      return vcrestangular.all('me').get('request', obj, {token: localStorageService.get('token')});
    };

    return request;

  });
