import Component from '@ember/component';
import { scheduleOnce, run } from '@ember/runloop';
import { copy } from '@ember/object/internals';
import moment from 'moment';

function formatDate(date) {
  return moment(date).format('YYYY/MM/DD H:mm');
}

export default Component.extend({
  tagName: 'input',
  classNames: ['date-time-picker'],

  init() {
    this._super();

    this.set('_changeHandlerProxy', this._changeHandler.bind(this));
  },

  _changeHandler(event) {
    run(() => {
      let newValue = event.target.value,
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

      this.get('action')(newDatetime);
    });
  },

  _updateValue(shouldForceUpdatePicker) {
    let value, datetime = this.get('datetime');
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
    let changeHandler = this._changeHandlerProxy;
    let options = this.get('options') || {};

    // https://github.com/emberjs/ember.js/issues/14655
    options = copy(options);

    this._updateValue();

    scheduleOnce('afterRender', () => {
      this.$()
        .datetimepicker(options)
        .on('change', changeHandler);
    });
  },

  didUpdateAttrs() {
    this._updateValue(true);
  },

  willDestroyElement() {
    let changeHandler = this._changeHandlerProxy;

    this.$()
      .off('change', changeHandler)
      .datetimepicker('destroy');
  }
}).reopenClass({
  positionalParams: ['datetime']
});
