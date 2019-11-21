'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const map = require('broccoli-stew').map;

module.exports = {
  name: require('./package').name,

  treeForVendor(tree) {
    let pathInNodeModules = path.resolve(path.dirname(require.resolve('jquery-datetimepicker')), '..');

    let jsTree = new Funnel(pathInNodeModules, {
      files: [
        'build/jquery.datetimepicker.full.js'
      ],
      destDir: 'jquery-datetimepicker'
    });

    jsTree = map(jsTree, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);

    let cssTree = new Funnel(pathInNodeModules, {
      files: [
        'jquery.datetimepicker.css',
      ],
      destDir: 'jquery-datetimepicker'
    });

    let newTree = mergeTrees([jsTree, cssTree]);

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
