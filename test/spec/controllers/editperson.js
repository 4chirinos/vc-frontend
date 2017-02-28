'use strict';

describe('Controller: EditpersonCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var EditpersonCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditpersonCtrl = $controller('EditpersonCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditpersonCtrl.awesomeThings.length).toBe(3);
  });
});
