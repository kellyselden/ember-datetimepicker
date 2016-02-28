import Ember from 'ember';

const {
  Component
} = Ember;

const MyComponent = Component.extend();

MyComponent.reopenClass({
  positionalParams: ['datetime']
});

export default MyComponent;
