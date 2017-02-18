'use strict';

describe('Controller: LoaddbfilesCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var LoaddbfilesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoaddbfilesCtrl = $controller('LoaddbfilesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LoaddbfilesCtrl.awesomeThings.length).toBe(3);
  });
});
