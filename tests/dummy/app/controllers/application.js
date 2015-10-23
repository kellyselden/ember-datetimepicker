import Ember from 'ember';

export default Ember.Controller.extend({
  initialDatetime: new Date(),
  options: {
    inline: true
  },

  actions: {
    changeInitialDatetime(initialDatetime) {
      this.set('initialDatetime', initialDatetime);
    },
    changeDatetime(datetime) {
      this.set('datetime', datetime);
    }
  }
});
