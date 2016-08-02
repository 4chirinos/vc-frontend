'use strict';

/**
 * @ngdoc service
 * @name frontend2App.user
 * @description
 * # user
 * Factory in the frontend2App.
 */
angular.module('frontend2App')
  .factory('user', function (vcrestangular) {

    var analystProfile = 7, coordinatorProfile = 8, visitorProfile = 9;

    var user = {};

    user.getVisitors = function(page, pageSize) {
      return vcrestangular.all('user').get('', {page: page, pageSize: pageSize, profile: visitorProfile}, {});
    };

    return user;

  });
