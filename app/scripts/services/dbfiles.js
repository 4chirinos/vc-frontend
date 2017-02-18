'use strict';

/**
 * @ngdoc service
 * @name frontend2App.dbfiles
 * @description
 * # dbfiles
 * Factory in the frontend2App.
 */
angular.module('frontend2App')
  .factory('dbfiles', function (vcrestangular, localStorageService) {
    
    var dbfiles = {};

    dbfiles.postFile = function(table, file) {

      var fd = new FormData();

      /*for(var i = 0; i < files.length; i++) {
        fd.append('file', file);
      }*/

      fd.append('file', file);

      return vcrestangular.one('load/' + table)
      .withHttpConfig({transformRequest: angular.identity})
      .customPOST(fd, '', {}, {'Content-Type': undefined, token: localStorageService.get('token')})

    };

    return dbfiles;

  });
