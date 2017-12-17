/* eslint-env node */
'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  normalizeEntityName() {},

  afterInstall() {
    let pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf8'));

    return this.addPackageToProject('jquery-datetimepicker', pkg.devDependencies['jquery-datetimepicker']).then(() => {
      return this.addAddonToProject({ name: 'ember-cli-moment-shim', target: pkg.devDependencies['ember-cli-moment-shim'] });
    });
  }
};
