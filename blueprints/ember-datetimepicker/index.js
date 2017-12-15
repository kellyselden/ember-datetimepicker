/* eslint-env node */
'use strict';

module.exports = {
  normalizeEntityName() {},

  afterInstall() {
    return require('pkg-conf')('devDependencies').then(devDependencies => {
      return this.addPackageToProject('jquery-datetimepicker', devDependencies['jquery-datetimepicker']).then(() => {
        return this.addAddonToProject({ name: 'ember-cli-moment-shim', target: devDependencies['ember-cli-moment-shim'] });
      });
    });
  }
};
