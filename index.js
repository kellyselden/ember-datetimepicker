/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-datetimepicker',
  options: {
    nodeAssets: {
      'jquery-datetimepicker': {
        import: [
          'jquery.datetimepicker.css',
          'build/jquery.datetimepicker.full.js'
        ]
      }
    }
  }
};
