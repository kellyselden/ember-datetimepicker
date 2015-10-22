/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-datetimepicker',

  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/datetimepicker/jquery.datetimepicker.css');
    app.import(app.bowerDirectory + '/datetimepicker/jquery.datetimepicker.js');
  }
};
