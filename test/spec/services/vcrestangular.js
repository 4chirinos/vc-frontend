'use strict';

describe('Service: vcrestangular', function () {

  // load the service's module
  beforeEach(module('frontend2App'));

  // instantiate service
  var vcrestangular;
  beforeEach(inject(function (_vcrestangular_) {
    vcrestangular = _vcrestangular_;
  }));

  it('should do something', function () {
    expect(!!vcrestangular).toBe(true);
  });

});
