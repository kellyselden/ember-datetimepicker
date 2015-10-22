import Ember from 'ember';

const { observer } = Ember;

const DateTimePickerComponent = Ember.Component.extend({
  tagName: 'input',

  datetimeChanged: observer('datetime', function() {
    let changeHandler = this.get('changeHandler');

    this.$()
      .off('change', changeHandler)
      .val(this.get('datetime'))
      .on('change', changeHandler);
  }),

  didInsertElement() {
    let changeHandler = event => {
      Ember.run(() => {
        this.sendAction('action', Ember.$(event.target).val());
      });
    };

    this.$()
      .datetimepicker()
      .on('change', changeHandler);

    this.set('changeHandler', changeHandler);
  }
});

DateTimePickerComponent.reopenClass({
  positionalParameters: ['datetime']
});

export default DateTimePickerComponent;
