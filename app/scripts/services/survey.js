'use strict';

/**
 * @ngdoc service
 * @name frontend2App.survey
 * @description
 * # survey
 * Factory in the frontend2App.
 */
angular.module('frontend2App')
  .factory('survey', function (vcrestangular, localStorageService) {
    
    var survey = {};

    survey.getByRequestId = function(id) {
      return vcrestangular.all('form').get('', {requestId: id}, {token: localStorageService.get('token')});
    };

    survey.postAnswer = function(id, obj) {
      return vcrestangular.all('request/' + id + '/answer').post({data: obj}, {}, {token: localStorageService.get('token')});
    };

    survey.postDocument = function(id, files) {

      var fd = new FormData();

      for(var i = 0; i < files.length; i++) {
        fd.append('file', files[i]);
      }

      return vcrestangular.one('form/' + id + '/document')
      .withHttpConfig({transformRequest: angular.identity})
      .customPOST(fd, '', {}, {'Content-Type': undefined, token: localStorageService.get('token')})

    };

    return survey;

  });
