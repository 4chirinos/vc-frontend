'use strict';

describe('Controller: GuaranteeletterdetailCtrl', function () {

  // load the controller's module
  beforeEach(module('frontend2App'));

  var GuaranteeletterdetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GuaranteeletterdetailCtrl = $controller('GuaranteeletterdetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GuaranteeletterdetailCtrl.awesomeThings.length).toBe(3);
  });
});
