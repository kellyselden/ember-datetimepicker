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
    timeout: 2 * 60 * 1000,
  });

  it('syncs dependencies between dev and blueprint', function () {
    return emberNew()
      .then(() => emberGenerate(['ember-datetimepicker']))
      .then(() => {
        let pkg = require('../../package.json');

        ['ember-cli-moment-shim', 'jquery-datetimepicker'].forEach((dep) => {
          expect(pkg.devDependencies[dep]).to.be.ok;
        });
      });
  });
});
