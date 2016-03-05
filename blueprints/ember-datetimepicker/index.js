module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function(options) {
    return this.addBowerPackageToProject('datetimepicker', '2.4.5').then(function() {
      return this.addAddonToProject({ name: 'ember-cli-moment-shim', target: '0.6.2' });
    }.bind(this));
  }
};
