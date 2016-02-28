import Ember from 'ember';

const {
  Test: { registerAsyncHelper },
  RSVP: { Promise }
} = Ember;

export default registerAsyncHelper('waitFor', function(app, selector, context,
  {
    count = 1,
    interval = 1
  } = {}) {
  return new Promise(resolve => {
    (function restart() {
      setTimeout(() => {
        if (find(selector, context).length === count) {
          resolve();
        } else {
          restart();
        }
      }, interval);
    })();
  });
});
