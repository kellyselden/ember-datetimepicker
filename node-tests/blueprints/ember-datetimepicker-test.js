'use strict';

const jsonfile = require('jsonfile');
const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerate = blueprintHelpers.emberGenerate;

const expect = require('ember-cli-blueprint-test-helpers/chai').expect;

describe('Acceptance: ember generate and destroy ember-datetimepicker', function() {
  setupTestHooks(this, {
    disabledTasks: [],
    timeout: 60000
  });

  it('syncs dependencies between dev and blueprint', function() {
    return emberNew()
      .then(() => emberGenerate(['ember-datetimepicker']))
      .then(() => {
        let pkg = jsonfile.readFileSync('package.json');

        [
          'ember-cli-moment-shim',
          'jquery-datetimepicker'
        ].forEach(dep => {
          expect(pkg.devDependencies[dep]).to.be.ok;
        });
      });
  });
});
