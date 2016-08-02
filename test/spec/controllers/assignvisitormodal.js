'use strict';

describe('Controller: AssignvisitormodalCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var AssignvisitormodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AssignvisitormodalCtrl = $controller('AssignvisitormodalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AssignvisitormodalCtrl.awesomeThings.length).toBe(3);
  });
});
