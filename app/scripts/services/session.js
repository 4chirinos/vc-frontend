'use strict';

/**
 * @ngdoc service
 * @name frontend2App.session
 * @description
 * # session
 * Factory in the frontend2App.
 */
angular.module('frontend2App')
  .factory('session', function (vcrestangular, localStorageService) {

    var session = {};

    session.login = function(data) {
      return vcrestangular.all('session').post(data);
    };

    session.logout = function() {
      var token = localStorageService.get('token');
      localStorageService.remove('token');
      return vcrestangular.all('session').remove({}, {token: token});
    };

    session.setToken = function(token) {
      localStorageService.set('token', token);
    };

    session.getToken = function() {
      return localStorageService.get('token');
    };

    session.setCurrentUser = function(data) {
      var user = {
        userId: data.userId,
        firstName: data.user.person.firstName,
        lastName: data.user.person.lastName,
        identityCard: data.user.person.identityCard,
        email: data.user.person.email,
        userProfile: data.user.profile.profile
      };
      localStorageService.set('currentUser', user);
    };

    session.getCurrentUser = function() {
      return localStorageService.get('currentUser');
    };

    return session;
  });
