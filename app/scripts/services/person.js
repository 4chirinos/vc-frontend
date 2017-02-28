'use strict';

/**
 * @ngdoc service
 * @name frontend2App.person
 * @description
 * # person
 * Factory in the frontend2App.
 */
angular.module('frontend2App')
  .factory('person', function (vcrestangular, localStorageService) {
    
    var person = {};

    person.getPersonById = function(id) {
      return vcrestangular.all('person').get(id, {}, {token: localStorageService.get('token')});
    };

    person.getPersonQS = function(obj) {
      return vcrestangular.all('person').get('', obj, {token: localStorageService.get('token')});
    };

    person.partialUpdate = function(obj) {
      return vcrestangular.all('person/' + obj.id).patch(obj, {}, {token: localStorageService.get('token')});
    };

    return person;

  });
