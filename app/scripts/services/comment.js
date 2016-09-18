'use strict';

/**
 * @ngdoc service
 * @name frontend2App.comment
 * @description
 * # comment
 * Factory in the frontend2App.
 */
angular.module('frontend2App')
  .factory('comment', function (vcrestangular, localStorageService) {

    var comment = {};
    
    comment.post = function(obj) {
        return vcrestangular.all('comment').post(obj, {}, {token: localStorageService.get('token')});
    };

    return comment;

  });
