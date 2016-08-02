'use strict';

describe('Service: guaranteeletter', function () {

  // load the service's module
  beforeEach(module('frontend2App'));

  // instantiate service
  var guaranteeletter;
  beforeEach(inject(function (_guaranteeletter_) {
    guaranteeletter = _guaranteeletter_;
  }));

  it('should do something', function () {
    expect(!!guaranteeletter).toBe(true);
  });

});
