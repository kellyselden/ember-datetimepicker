import Component from '@ember/component';

const MyComponent = Component.extend();

MyComponent.reopenClass({
  positionalParams: ['datetime']
});

export default MyComponent;
