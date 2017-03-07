import Ember from 'ember';

const {
  Controller,
  setProperties
} = Ember;

const initialDatetime = new Date('12/25/1994 13:35');

export default Controller.extend({
  initialDatetime,

  shouldShow: true,

  actions: {
    shouldShow() {
      this.toggleProperty('shouldShow');
    },
    updateCustomFormat(datetime) {
      console.log(datetime);
    },
    reset() {
      setProperties(this, {
        datetime: undefined,
        initialDatetime
      });
    }
  }
});
