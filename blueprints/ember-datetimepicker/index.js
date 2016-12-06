module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function(options) {
    return this.addPackageToProject('jquery-datetimepicker', '2.5.4').then(function() {
      return this.addAddonToProject({ name: 'ember-cli-moment-shim', target: '^3.0.0' });
    }.bind(this));
  }
};
