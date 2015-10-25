import Ember from 'ember';

export default Ember.Controller.extend({
  initialDatetime: new Date(),
  options: {
    inline: true
  },

  actions: {
    changeDatetime(datetime) {
      this.set('datetime', datetime);
    },
    changeInitialDatetime(initialDatetime) {
      this.set('initialDatetime', initialDatetime);
    },
    clear() {
      this.set('datetime', undefined);
      this.set('initialDatetime', undefined);
    }
  }
});
