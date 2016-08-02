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

    request.getRequest = function(page, pageSize, statusId) {
      return vcrestangular.all('request').get('me',
        {page: page, pageSize: pageSize, statusId: statusId},
        {token: localStorageService.get('token')});
    };

    request.postRequest = function(obj) {
        return vcrestangular.all('request').post(obj, {}, {token: localStorageService.get('token')});
    };

    request.partialUpdate = function(obj) {
      return vcrestangular.all('request/' + obj.id).patch(obj, {}, {token: localStorageService.get('token')});
    };

    return request;

  });
