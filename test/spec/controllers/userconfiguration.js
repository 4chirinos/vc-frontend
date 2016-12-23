'use strict';

describe('Controller: UserconfigurationCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var UserconfigurationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserconfigurationCtrl = $controller('UserconfigurationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserconfigurationCtrl.awesomeThings.length).toBe(3);
  });
});
