'use strict';

describe('Controller: EditingaffiliatedCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var EditingaffiliatedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditingaffiliatedCtrl = $controller('EditingaffiliatedCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditingaffiliatedCtrl.awesomeThings.length).toBe(3);
  });
});
