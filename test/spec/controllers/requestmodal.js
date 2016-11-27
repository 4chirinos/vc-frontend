'use strict';

describe('Controller: RequestmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var RequestmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RequestmodalCtrl = $controller('RequestmodalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RequestmodalCtrl.awesomeThings.length).toBe(3);
  });
});
