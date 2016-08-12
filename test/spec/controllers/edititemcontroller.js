'use strict';

describe('Controller: EdititemcontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var EdititemcontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EdititemcontrollerCtrl = $controller('EdititemcontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EdititemcontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
