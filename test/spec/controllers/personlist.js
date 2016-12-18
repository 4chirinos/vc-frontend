'use strict';

describe('Controller: PersonlistCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var PersonlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonlistCtrl = $controller('PersonlistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PersonlistCtrl.awesomeThings.length).toBe(3);
  });
});
