'use strict';

describe('Service: owm', function () {

  // load the service's module
  beforeEach(module('meteoApp'));

  // instantiate service
  var owm;
  beforeEach(inject(function (_owm_) {
    owm = _owm_;
  }));

  it('should do something', function () {
    expect(!!owm).toBe(true);
  });

});
