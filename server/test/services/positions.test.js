const assert = require('assert');
const app = require('../../src/app');

describe('\'positions\' service', () => {
  it('registered the service', () => {
    const service = app.service('position');

    assert.ok(service, 'Registered the service');
  });
});
