'use strict';

describe('Controller: FilterpersonCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var FilterpersonCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FilterpersonCtrl = $controller('FilterpersonCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FilterpersonCtrl.awesomeThings.length).toBe(3);
  });
});
