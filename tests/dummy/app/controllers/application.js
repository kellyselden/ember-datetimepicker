import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    changeDatetime(datetime) {
      this.set('datetime', datetime);
    }
  }
});
