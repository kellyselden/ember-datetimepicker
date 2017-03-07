import Ember from 'ember';
import moment from 'moment';

const {
  Component,
  get,
  on,
  observer,
  computed,
  run,
  run: { scheduleOnce },
  $: { proxy },
  copy
} = Ember;

function formatDate(date, format = 'YYYY/MM/DD H:mm') {
  return moment(date).format(format);
}

const MyComponent = Component.extend({
  tagName: 'input',
  classNames: ['date-time-picker'],

  _changeHandler(newValue) {
    run(() => {
      let oldValue = get(this, 'datetime'),
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
    this._updateValue(true);
  }),

  _updateValue(shouldForceUpdatePicker) {
    let value, datetime = get(this, 'datetime');
    if (datetime) {
      value = formatDate(datetime, get(this, 'options.format'));
    } else {
      value = '';
    }

    let el = this.$();
    el.val(value);

    // is only needed for inline, changing value above didn't change the picker
    if (shouldForceUpdatePicker) {
      el.datetimepicker({ value });
    }
  },

  setUp: on('didInsertElement', function() {
    let changeHandler = get(this, '_changeHandlerProxy');
    let options = get(this, 'options') || {};

    // https://github.com/emberjs/ember.js/issues/14655
    options = copy(options);

    options.onChangeDateTime = changeHandler;

    this._updateValue();

    scheduleOnce('afterRender', () => {
      this.$()
        .datetimepicker(options);
    });
  }),

  tearDown: on('willDestroyElement', function() {
    let changeHandler = get(this, '_changeHandlerProxy');

    this.$()
      .off('change', changeHandler)
      .datetimepicker('destroy');
  })
});

MyComponent.reopenClass({
  positionalParams: ['datetime']
});

export default MyComponent;
