'use strict';

describe('Controller: BudgetlistCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var BudgetlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BudgetlistCtrl = $controller('BudgetlistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BudgetlistCtrl.awesomeThings.length).toBe(3);
  });
});
