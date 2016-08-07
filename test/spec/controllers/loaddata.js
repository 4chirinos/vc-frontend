'use strict';

describe('Controller: LoaddataCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var LoaddataCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoaddataCtrl = $controller('LoaddataCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LoaddataCtrl.awesomeThings.length).toBe(3);
  });
});
