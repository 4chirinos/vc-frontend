'use strict';

describe('Controller: FilterbudgetCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var FilterbudgetCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FilterbudgetCtrl = $controller('FilterbudgetCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FilterbudgetCtrl.awesomeThings.length).toBe(3);
  });
});
