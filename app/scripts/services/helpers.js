'use strict';

/**
 * @ngdoc service
 * @name frontend2App.helpers
 * @description
 * # helpers
 * Factory in the frontend2App.
 */
angular.module('frontend2App')
  .factory('helpers', function ($rootScope) {
    
    var helpers = {},
      porAsignar = 0, asignada = 0, atendida = 0, enRevision = 0, finalizada = 0;

    helpers.cargar = function() {

      for(var i = 0; i < $rootScope.statusGroups.length; i++) {
        if($rootScope.statusGroups[i].status == 'por asignar') porAsignar = $rootScope.statusGroups[i].cantidad;
        else if($rootScope.statusGroups[i].status == 'asignada') asignada = $rootScope.statusGroups[i].cantidad;
        else if($rootScope.statusGroups[i].status == 'atendidas') atendida = $rootScope.statusGroups[i].cantidad;
        else if($rootScope.statusGroups[i].status == 'en revision') enRevision = $rootScope.statusGroups[i].cantidad;
        else finalizadas = $rootScope.statusGroups[i].cantidad;
      }

    }

    helpers.porAsignar = function() {
      return porAsignar;
    };

    helpers.asignada = function() {
      return asignada;
    };

    helpers.atendida = function() {
      return atendida;
    };

    helpers.enRevision = function() {
      return enRevision;
    }

    helpers.finalizada = function() {
      return finalizada;
    };

    return helpers;

  });
