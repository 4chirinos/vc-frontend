'use strict';

describe('Service: dbfiles', function () {

  // load the service's module
  beforeEach(module('frontend2App'));

  // instantiate service
  var dbfiles;
  beforeEach(inject(function (_dbfiles_) {
    dbfiles = _dbfiles_;
  }));

  it('should do something', function () {
    expect(!!dbfiles).toBe(true);
  });

});
