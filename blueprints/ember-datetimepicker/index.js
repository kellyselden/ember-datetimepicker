module.exports = {
  description: '',

  afterInstall: function(options) {
    return this.addBowerPackageToProject('datetimepicker');
  }
};
