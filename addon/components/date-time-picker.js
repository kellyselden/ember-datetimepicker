import Component from '@ember/component';
import $ from 'jquery'
import { scheduleOnce, bind } from '@ember/runloop';
import moment from 'moment';

function formatDate(date, format) {
  return moment(date, format).format(format);
}

export default Component.extend({
  tagName: 'input',
  classNames: ['date-time-picker'],

  init() {
    this._super();

    // We want to default the format to jquery-datetimepicker's default format
    if (!this.options) {
      this.set('options', { format: 'YYYY/MM/DD H:mm'});
    }
    if (!this.options.format) {
      this.options.format = 'YYYY/MM/DD H:mm';
    }

    this.set('_changeHandlerProxy', bind(this, this._changeHandler));
  },

  _changeHandler(event) {
    let newValue = event.target.value;
    let oldValue = this.datetime,
        format = this.options.format;

    let newDatetime, newDatetimeFormat, oldDatetimeFormat;
    if (newValue) {
      newDatetime = moment(newValue, format);
      newDatetimeFormat = formatDate(newValue, format);
    }
    if (oldValue) {
      oldDatetimeFormat = formatDate(oldValue, format);
    }

    if (newDatetimeFormat === oldDatetimeFormat) {
      return;
    }

    this.action(newDatetime);
  },

  _updateValue(shouldForceUpdatePicker) {
    let value,
        format = this.options.format;

    let { datetime } = this;
    if (datetime) {
      value = formatDate(datetime, format);
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
      $.datetimepicker.setDateFormatter('moment');
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
