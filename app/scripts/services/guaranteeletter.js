'use strict';

/**
 * @ngdoc service
 * @name frontend2App.guaranteeletter
 * @description
 * # guaranteeletter
 * Factory in the frontend2App.
 */
angular.module('frontend2App')
  .factory('guaranteeletter', function (vcrestangular, localStorageService) {

    var guaranteeLetter = {};

    guaranteeLetter.getGuaranteeLetter = function(params) {
      return vcrestangular.all('guaranteeLetter').getList(params, {token: localStorageService.get('token')});
    };

    return guaranteeLetter;

  });
