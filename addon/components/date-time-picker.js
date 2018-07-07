import $ from 'jquery';
import Component from '@ember/component';
import { computed, observer, get } from '@ember/object';
import { scheduleOnce, run } from '@ember/runloop';
import { copy } from '@ember/object/internals';
import moment from 'moment';

const {
  proxy
} = $;

function formatDate(date) {
  return moment(date).format('YYYY/MM/DD H:mm');
}

export default Component.extend({
  tagName: 'input',
  classNames: ['date-time-picker'],

  _changeHandler(event) {
    run(() => {
      let newValue = $(event.target).val(),
          oldValue = get(this, 'datetime'),
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
      value = formatDate(datetime);
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

  didInsertElement() {
    this._super(...arguments);

    let changeHandler = get(this, '_changeHandlerProxy');
    let options = get(this, 'options') || {};

    // https://github.com/emberjs/ember.js/issues/14655
    options = copy(options);

    this._updateValue();

    scheduleOnce('afterRender', () => {
      this.$()
        .datetimepicker(options)
        .on('change', changeHandler);
    });
  },

  willDestroyElement() {
    this._super(...arguments);

    let changeHandler = get(this, '_changeHandlerProxy');

    this.$()
      .off('change', changeHandler)
      .datetimepicker('destroy');
  }
}).reopenClass({
  positionalParams: ['datetime']
});
