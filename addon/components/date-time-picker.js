import Ember from 'ember';
import moment from 'moment';

const { observer } = Ember;

const DateTimePickerComponent = Ember.Component.extend({
  tagName: 'input',

  datetimeChanged: observer('datetime', function() {
    let changeHandler = this.get('changeHandler');
    let datetime = this.get('datetime');
    let format = 'YYYY/MM/DD H:mm';
    let value = moment(datetime).format(format);

    this.$()
      .off('change', changeHandler)
      .val(value)
      .on('change', changeHandler);
  }),

  didInsertElement() {
    let changeHandler = event => {
      Ember.run(() => {
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
    };
    let options = this.get('options') || {};

    this.$()
      .datetimepicker(options)
      .on('change', changeHandler);

    this.set('changeHandler', changeHandler);
  }
});

DateTimePickerComponent.reopenClass({
  positionalParams: ['datetime']
});

export default DateTimePickerComponent;
