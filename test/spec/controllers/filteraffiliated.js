'use strict';

describe('Controller: FilteraffiliatedCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var FilteraffiliatedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FilteraffiliatedCtrl = $controller('FilteraffiliatedCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FilteraffiliatedCtrl.awesomeThings.length).toBe(3);
  });
});
