/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-datetimepicker',

  treeForVendor: function(tree) {
    var pathInNodeModules = path.resolve(path.dirname(require.resolve('jquery-datetimepicker')), '..');

    var newTree = new Funnel(pathInNodeModules, {
      files: [
        'jquery.datetimepicker.css',
        'build/jquery.datetimepicker.full.js'
      ],
      destDir: 'jquery-datetimepicker'
    });

    if (tree) {
      newTree = mergeTrees([tree, newTree]);
    }

    return newTree;
  },

  included: function(app) {
    this._super.included(app);

    app.import('vendor/jquery-datetimepicker/jquery.datetimepicker.css');
    app.import('vendor/jquery-datetimepicker/build/jquery.datetimepicker.full.js');
  }
};
