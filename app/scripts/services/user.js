'use strict';

/**
 * @ngdoc service
 * @name frontend2App.user
 * @description
 * # user
 * Factory in the frontend2App.
 */
angular.module('frontend2App')
  .factory('user', function (vcrestangular, localStorageService) {

    var analystProfile = 7, coordinatorProfile = 8, visitorProfile = 9;

    var user = {};

    user.getVisitors = function(page, pageSize) {
      return vcrestangular.all('user').get('', {page: page, pageSize: pageSize, profile: visitorProfile}, {token: localStorageService.get('token')});
    };

    user.postUser = function(obj) {
      return vcrestangular.all('user').post(obj, {}, {token: localStorageService.get('token')});
    };

    user.partialUpdate = function(obj) {
      return vcrestangular.all('user/' + obj.id).patch(obj, {}, {token: localStorageService.get('token')});
    };

    user.verifyUsername = function(obj) {
      return vcrestangular.all('verification/user/username').get('', obj, {token: localStorageService.get('token')});
    };

    user.password = function(username) {
      return vcrestangular.all('password/user/' + username).get('', {}, {token: localStorageService.get('token')});
    };

    return user;

  });
