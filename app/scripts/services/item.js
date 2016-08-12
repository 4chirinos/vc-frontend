'use strict';

/**
 * @ngdoc service
 * @name frontend2App.item
 * @description
 * # item
 * Factory in the frontend2App.
 */
angular.module('frontend2App')
  .factory('item', function (vcrestangular, localStorageService) {

    var item = {};

    item.partialUpdate = function(obj) {
      return vcrestangular.all('item/' + obj.id).patch(obj, {}, {token: localStorageService.get('token')});
    };

    return item;

  });
