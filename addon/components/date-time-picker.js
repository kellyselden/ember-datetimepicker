import Ember from 'ember';
import moment from 'moment';

const {
  observer,
  computed,
  run,
  $: { proxy }
} = Ember;

function formatDate(date) {
  return moment(date).format('YYYY/MM/DD H:mm');
}

const DateTimePickerComponent = Ember.Component.extend({
  tagName: 'input',

  _changeHandler(event) {
    run(() => {
      let newValue = Ember.$(event.target).val(),
          oldValue = this.get('datetime'),
          newDatetime, newDatetimeFormat, oldDatetimeFormat;
      if (newValue) {
        newDatetime = new Date(newValue);
        newDatetimeFormat = formatDate(newDatetime);
      }
      if (oldValue) {
        oldDatetimeFormat = formatDate(oldValue);
      }

      if (newDatetimeFormat === oldDatetimeFormat) {
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
    let value, datetime = this.get('datetime');
    if (datetime) {
      value = formatDate(datetime);
    } else {
      value = '';
    }
    this.$().val(value);
  },

  didInsertElement() {
    let changeHandler = this.get('_changeHandlerProxy');
    let options = this.get('options') || {};

    this._updateValue();

    this.$()
      .datetimepicker(options)
      .on('change', changeHandler);
  }
});

DateTimePickerComponent.reopenClass({
  positionalParams: ['datetime']
});

export default DateTimePickerComponent;
