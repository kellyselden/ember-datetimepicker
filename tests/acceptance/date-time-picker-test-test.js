import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | date time picker test');

test('inline is visible on page load in context', function(assert) {
  visit('/');

  andThen(function() {
    assert.strictEqual(find('.xdsoft_datetimepicker.display-inline:visible').length, 1);
  });
});

test('clicking toggles visibility', function(assert) {
  let done = assert.async();

  visit('/');

  andThen(function() {
    assert.strictEqual(find('.xdsoft_datetimepicker.display-regular:visible', 'body').length, 0);
  });

  click('.display-regular .date-time-picker');

  waitFor('.xdsoft_datetimepicker.display-regular:visible', 'body');

  andThen(function() {
    assert.strictEqual(find('.xdsoft_datetimepicker.display-regular:visible', 'body').length, 1);
  });

  click('#title');

  andThen(function() {
    assert.strictEqual(find('.xdsoft_datetimepicker.display-regular:visible', 'body').length, 0);
    done();
  });
});

test('is cleaned up', function(assert) {
  visit('/');

  andThen(function() {
    assert.strictEqual(find('.xdsoft_datetimepicker.display-regular', 'body').length, 1);
  });

  click('#toggle');

  andThen(function() {
    assert.strictEqual(find('.xdsoft_datetimepicker.display-regular', 'body').length, 0);
  });
});

test('accepts initial date and time', function(assert) {
  visit('/');

  andThen(function() {
    let cal = find('.display-inline');
    let date = cal.find('.xdsoft_date.xdsoft_current');
    let time = cal.find('.xdsoft_time.xdsoft_current');
    assert.strictEqual(date.attr('data-year'), '1994');
    assert.strictEqual(date.attr('data-month'), '11');
    assert.strictEqual(date.attr('data-date'), '25');
    assert.strictEqual(time.attr('data-hour'), '13');
    assert.strictEqual(time.attr('data-minute'), '35');
  });
});
