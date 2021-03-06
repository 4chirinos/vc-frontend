'use strict';

describe('Controller: RequestdetailCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var RequestdetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RequestdetailCtrl = $controller('RequestdetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RequestdetailCtrl.awesomeThings.length).toBe(3);
  });
});
