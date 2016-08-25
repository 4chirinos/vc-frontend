'use strict';

/**
 * @ngdoc service
 * @name frontend2App.vcrestangular
 * @description
 * # vcrestangular
 * Factory in the frontend2App.
 */
angular.module('frontend2App')
  .factory('vcrestangular', function (Restangular, baseUrl) {
    var newBaseUrl = baseUrl;
    
    /*if (window.location.hostname == "localhost") {
      newBaseUrl = "http://localhost:3000/api/v1";
    } else {
      //var deployedAt = window.location.href.substring(0, window.location.href);
      var deployedAt = 'https://pacific-inlet-56422.herokuapp.com';
      newBaseUrl = deployedAt + "/api/v1";
    }*/
    
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(newBaseUrl);
      RestangularConfigurer.setFullResponse(true);
    });
  });
