'use strict';

describe('Controller: AdminbudgetCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var AdminbudgetCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminbudgetCtrl = $controller('AdminbudgetCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminbudgetCtrl.awesomeThings.length).toBe(3);
  });
});
