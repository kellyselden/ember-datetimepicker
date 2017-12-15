/* eslint-env node */
'use strict';

module.exports = {
  normalizeEntityName() {},

  afterInstall() {
    let pkg = require('../../package.json');

    return this.addPackageToProject('jquery-datetimepicker', pkg.devDependencies['jquery-datetimepicker']).then(() => {
      return this.addAddonToProject({ name: 'ember-cli-moment-shim', target: pkg.devDependencies['ember-cli-moment-shim'] });
    });
  }
};
