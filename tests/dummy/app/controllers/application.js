import Ember from 'ember';

const {
  Controller,
  setProperties
} = Ember;

export default Controller.extend({
  initialDatetime: new Date('12/25/1994 13:35'),

  shouldShow: true,

  actions: {
    shouldShow() {
      this.toggleProperty('shouldShow');
    },
    clear() {
      setProperties(this, {
        datetime: undefined,
        initialDatetime: undefined
      });
    }
  }
});
