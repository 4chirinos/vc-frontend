'use strict';

describe('Service: survey', function () {

  // load the service's module
  beforeEach(module('frontend2App'));

  // instantiate service
  var survey;
  beforeEach(inject(function (_survey_) {
    survey = _survey_;
  }));

  it('should do something', function () {
    expect(!!survey).toBe(true);
  });

});
