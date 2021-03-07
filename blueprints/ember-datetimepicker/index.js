'use strict';

module.exports = {
  normalizeEntityName() {},

  async afterInstall() {
    let devDependencies = await require('pkg-conf')('devDependencies');

    await this.addPackageToProject(
      'jquery-datetimepicker',
      devDependencies['jquery-datetimepicker']
    );

    await this.addAddonToProject({
      name: 'ember-cli-moment-shim',
      target: devDependencies['ember-cli-moment-shim'],
    });
  },
};
