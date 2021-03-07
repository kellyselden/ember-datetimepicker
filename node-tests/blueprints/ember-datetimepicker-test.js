'use strict';

const {
  setupTestHooks,
  emberNew,
  emberGenerate,
} = require('ember-cli-blueprint-test-helpers/helpers');
const { expect } = require('ember-cli-blueprint-test-helpers/chai');

describe('Acceptance: ember generate and destroy ember-datetimepicker', function () {
  setupTestHooks(this, {
    disabledTasks: [],
    timeout: 2 * 60e3,
  });

  it('syncs dependencies between dev and blueprint', async function () {
    await emberNew();

    await emberGenerate(['ember-datetimepicker']);

    let pkg = require('../../package');

    for (let dep of ['ember-cli-moment-shim', 'jquery-datetimepicker']) {
      expect(pkg.devDependencies[dep]).to.be.ok;
    }
  });
});
