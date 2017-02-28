'use strict';

describe('Controller: AffiliatedlistCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var AffiliatedlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AffiliatedlistCtrl = $controller('AffiliatedlistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AffiliatedlistCtrl.awesomeThings.length).toBe(3);
  });
});
