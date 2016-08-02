'use strict';

describe('Controller: RequestlistCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var RequestlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RequestlistCtrl = $controller('RequestlistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RequestlistCtrl.awesomeThings.length).toBe(3);
  });
});
