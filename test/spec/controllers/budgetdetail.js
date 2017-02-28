'use strict';

describe('Controller: BudgetdetailCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var BudgetdetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BudgetdetailCtrl = $controller('BudgetdetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(BudgetdetailCtrl.awesomeThings.length).toBe(3);
  });
});
