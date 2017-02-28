'use strict';

describe('Service: affiliated', function () {

  // load the service's module
  beforeEach(module('frontend2App'));

  // instantiate service
  var affiliated;
  beforeEach(inject(function (_affiliated_) {
    affiliated = _affiliated_;
  }));

  it('should do something', function () {
    expect(!!affiliated).toBe(true);
  });

});
