import Component from '@ember/component';
import { scheduleOnce, bind } from '@ember/runloop';
import moment from 'moment';

function formatDate(date) {
  return moment(date).format('YYYY/MM/DD H:mm');
}

export default Component.extend({
  tagName: 'input',
  classNames: ['date-time-picker'],

  init() {
    this._super();

    if (!this.options) {
      this.set('options', {});
    }

    this.set('_changeHandlerProxy', bind(this, this._changeHandler));
  },

  _changeHandler(event) {
    let newValue = event.target.value;
    let oldValue = this.datetime;
    let newDatetime, newDatetimeFormat, oldDatetimeFormat;
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

    this.action(newDatetime);
  },

  _updateValue(shouldForceUpdatePicker) {
    let value;
    let { datetime } = this;
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
    let { options } = this;

    this._updateValue();

    scheduleOnce('afterRender', () => {
      this.$()
        .datetimepicker(options)
        .on('change', this._changeHandlerProxy);
    });
  },

  didUpdateAttrs() {
    this._updateValue(true);
  },

  willDestroyElement() {
    this.$()
      .off('change', this._changeHandlerProxy)
      .datetimepicker('destroy');
  }
}).reopenClass({
  positionalParams: ['datetime']
});
