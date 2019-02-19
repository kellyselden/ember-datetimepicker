'use strict';

const getChannelURL = require('ember-source-channel-url');

module.exports = function() {
  return Promise.all([
    getChannelURL('release'),
    getChannelURL('beta'),
    getChannelURL('canary')
  ]).then((urls) => {
    return {
      scenarios: [
        {
          name: 'ember-lts-2.18',
          env: {
            EMBER_OPTIONAL_FEATURES: JSON.stringify({ 'jquery-integration': true })
          },
          npm: {
            devDependencies: {
              '@ember/jquery': '^0.5.1',
              'ember-source': '~2.18.0'
            }
          }
        },
        {
          name: 'ember-lts-3.4',
          env: {
            EMBER_OPTIONAL_FEATURES: JSON.stringify({
              'jquery-integration': true
            })
          },
          npm: {
            devDependencies: {
              '@ember/jquery': '^0.5.1',
              'ember-source': '~3.4.0'
            }
          }
        },
        {
          name: 'ember-release',
          env: {
            EMBER_OPTIONAL_FEATURES: JSON.stringify({
              'jquery-integration': true
            })
          },
          npm: {
            devDependencies: {
              '@ember/jquery': '^0.5.1',
              'ember-source': urls[0]
            }
          }
        },
        {
          name: 'ember-beta',
          env: {
            EMBER_OPTIONAL_FEATURES: JSON.stringify({
              'jquery-integration': true
            })
          },
          npm: {
            devDependencies: {
              '@ember/jquery': '^0.5.1',
              'ember-source': urls[1]
            }
          }
        },
        {
          name: 'ember-canary',
          env: {
            EMBER_OPTIONAL_FEATURES: JSON.stringify({
              'jquery-integration': true
            })
          },
          npm: {
            devDependencies: {
              '@ember/jquery': '^0.5.1',
              'ember-source': urls[2]
            }
          }
        }
      ]
    };
  });
};
