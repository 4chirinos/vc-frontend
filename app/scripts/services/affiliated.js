'use strict';

/**
 * @ngdoc service
 * @name frontend2App.affiliated
 * @description
 * # affiliated
 * Factory in the frontend2App.
 */
angular.module('frontend2App')
  .factory('affiliated', function (vcrestangular, localStorageService) {

    var affiliated = {};
    
    affiliated.getAll = function(obj) {
      return vcrestangular.all('affiliated').get('', obj, {token: localStorageService.get('token')});
    };

    affiliated.getById = function(id) {
      return vcrestangular.all('affiliated').get(id, {}, {token: localStorageService.get('token')});
    };

    affiliated.partialUpdate = function(obj) {
      return vcrestangular.all('affiliated/' + obj.id).patch(obj, {}, {token: localStorageService.get('token')});
    };

    return affiliated;

  });
