/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-datetimepicker',

  treeForVendor(tree) {
    let pathInNodeModules = path.resolve(path.dirname(require.resolve('jquery-datetimepicker')), '..');

    let newTree = new Funnel(pathInNodeModules, {
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

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/jquery-datetimepicker/jquery.datetimepicker.css');
    app.import('vendor/jquery-datetimepicker/build/jquery.datetimepicker.full.js');
  }
};
