'use strict';

describe('Service: budget', function () {

  // load the service's module
  beforeEach(module('frontend2App'));

  // instantiate service
  var budget;
  beforeEach(inject(function (_budget_) {
    budget = _budget_;
  }));

  it('should do something', function () {
    expect(!!budget).toBe(true);
  });

});
