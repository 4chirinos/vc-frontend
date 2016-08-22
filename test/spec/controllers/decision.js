'use strict';

describe('Controller: DecisionCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var DecisionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DecisionCtrl = $controller('DecisionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DecisionCtrl.awesomeThings.length).toBe(3);
  });
});
