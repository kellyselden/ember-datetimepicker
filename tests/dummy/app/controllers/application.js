import Controller from '@ember/controller';
import { setProperties } from '@ember/object';

const initialDatetime = new Date('12/25/1994 13:35');

export default Controller.extend({
  initialDatetime,

  shouldShow: true,

  actions: {
    shouldShow() {
      this.toggleProperty('shouldShow');
    },
    reset() {
      setProperties(this, {
        datetime: undefined,
        initialDatetime
      });
    }
  }
});
