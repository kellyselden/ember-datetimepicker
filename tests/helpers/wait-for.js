import Ember from 'ember';

const {
  Test: { registerAsyncHelper },
  RSVP: { Promise }
} = Ember;

export default registerAsyncHelper('waitFor', function(app, selector, context) {
  return new Promise(resolve => {
    (function restart() {
      setTimeout(() => {
        if (find(selector, context).length) {
          resolve();
        } else {
          restart();
        }
      }, 1);
    })();
  });
});
