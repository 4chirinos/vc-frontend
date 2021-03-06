'use strict';

describe('Controller: FilterguaranteeCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var FilterguaranteeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FilterguaranteeCtrl = $controller('FilterguaranteeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FilterguaranteeCtrl.awesomeThings.length).toBe(3);
  });
});
