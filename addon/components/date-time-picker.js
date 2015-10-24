import Ember from 'ember';
import moment from 'moment';

const {
  observer,
  computed,
  run,
  $: { proxy }
} = Ember;

const DateTimePickerComponent = Ember.Component.extend({
  tagName: 'input',

  _changeHandler(event) {
    run(() => {
      let value = Ember.$(event.target).val();
      if (!value) {
        return;
      }

      let newDatetime = new Date(value),
          oldDatetime = this.get('datetime');
      if (+newDatetime === +oldDatetime) {
        return;
      }

      this.sendAction('action', newDatetime);
    });
  },
  _changeHandlerProxy: computed(function() {
    return proxy(this._changeHandler, this);
  }),

  _datetimeChanged: observer('datetime', function() {
    this._updateValue();
  }),

  _updateValue() {
    let datetime = this.get('datetime');
    if (!datetime) {
      return;
    }

    let changeHandler = this.get('_changeHandlerProxy');
    let format = 'YYYY/MM/DD H:mm';
    let value = moment(datetime).format(format);

    this.$()
      .off('change', changeHandler)
      .val(value)
      .on('change', changeHandler);
  },

  didInsertElement() {
    let changeHandler = this.get('_changeHandlerProxy');
    let options = this.get('options') || {};

    this.$()
      .datetimepicker(options)
      .on('change', changeHandler);

    this._updateValue();
  }
});

DateTimePickerComponent.reopenClass({
  positionalParams: ['datetime']
});

export default DateTimePickerComponent;
