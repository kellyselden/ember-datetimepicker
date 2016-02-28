import Ember from 'ember';

const {
  Component
} = Ember;

const MyComponent = Component.extend({
  classNames: ['display-regular']
});

MyComponent.reopenClass({
  positionalParams: ['datetime']
});

export default MyComponent;
