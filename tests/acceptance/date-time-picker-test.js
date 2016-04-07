import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | date time picker');

function assertInitialDateTime(assert) {
  let cal = find('.display-inline');
  let date = cal.find('.xdsoft_date.xdsoft_current');
  let time = cal.find('.xdsoft_time.xdsoft_current');
  assert.strictEqual(date.attr('data-year'), '1994');
  assert.strictEqual(date.attr('data-month'), '11');
  assert.strictEqual(date.attr('data-date'), '25');
  assert.strictEqual(time.attr('data-hour'), '13');
  assert.strictEqual(time.attr('data-minute'), '35');
}

function changeInitialDateTime() {
  click('.display-inline .xdsoft_date:not(.xdsoft_current)');
}

test('inline is visible on page load in context', function(assert) {
  visit('/');

  andThen(function() {
    assert.strictEqual(find('.xdsoft_datetimepicker.display-inline:visible').length, 1);
  });
});

test('clicking toggles visibility', function(assert) {
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
    assertInitialDateTime(assert);
  });
});

test('clicking changes date', function(assert) {
  visit('/');

  let originalText;

  andThen(function() {
    originalText = find('.display-inline .text').text();
  });

  changeInitialDateTime();

  andThen(function() {
    let newText = find('.display-inline .text').text();
    assert.notStrictEqual(newText, originalText);
  });
});

test('can reset date', function(assert) {
  visit('/');

  changeInitialDateTime();

  let originalText;

  andThen(function() {
    originalText = find('.display-inline .text').text();
  });

  click('#reset');

  andThen(function() {
    let newText = find('.display-inline .text').text();
    assert.notStrictEqual(newText, originalText);

    assertInitialDateTime(assert);
  });
});
