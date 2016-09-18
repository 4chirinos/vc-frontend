'use strict';

describe('Controller: GuaranteelistCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var GuaranteelistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GuaranteelistCtrl = $controller('GuaranteelistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GuaranteelistCtrl.awesomeThings.length).toBe(3);
  });
});
