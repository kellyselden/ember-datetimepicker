import { click, find, visit, waitUntil } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import $ from 'jquery';

module('Acceptance | date time picker', function(hooks) {
  setupApplicationTest(hooks);

  function assertInitialDateTime(assert) {
    let cal = find('.display-inline');
    let date = cal.querySelector('.xdsoft_date.xdsoft_current');
    let time = cal.querySelector('.xdsoft_time.xdsoft_current');
    assert.strictEqual(date.getAttribute('data-year'), '1994');
    assert.strictEqual(date.getAttribute('data-month'), '11');
    assert.strictEqual(date.getAttribute('data-date'), '25');
    assert.strictEqual(time.getAttribute('data-hour'), '13');
    assert.strictEqual(time.getAttribute('data-minute'), '35');
  }

  async function changeInitialDateTime() {
    await click('.display-inline .xdsoft_date:not(.xdsoft_current)');
  }

  test('inline is visible on page load in context', async function(assert) {
    await visit('/');

    assert.strictEqual($('.xdsoft_datetimepicker.display-inline:visible').length, 1);
  });

  test('clicking toggles visibility', async function(assert) {
    await visit('/');

    assert.strictEqual($('.xdsoft_datetimepicker.display-regular:visible').length, 0);

    await click('.display-regular .date-time-picker');

    await waitUntil(() => $('.xdsoft_datetimepicker.display-regular:visible').length);

    assert.strictEqual($('.xdsoft_datetimepicker.display-regular:visible').length, 1);

    await click('#title');

    assert.strictEqual($('.xdsoft_datetimepicker.display-regular:visible').length, 0);
  });

  test('is cleaned up', async function(assert) {
    await visit('/');

    assert.strictEqual($('.xdsoft_datetimepicker.display-regular').length, 1);

    await click('#toggle');

    assert.strictEqual($('.xdsoft_datetimepicker.display-regular').length, 0);
  });

  test('accepts initial date and time', async function(assert) {
    await visit('/');

    assertInitialDateTime(assert);
  });

  test('clicking changes date', async function(assert) {
    await visit('/');

    let originalText = find('.display-inline .text').textContent;

    await changeInitialDateTime();

    let newText = find('.display-inline .text').textContent;

    assert.notStrictEqual(newText, originalText);
  });

  test('can reset date', async function(assert) {
    await visit('/');

    await changeInitialDateTime();

    let originalText = find('.display-inline .text').textContent;

    let cal = find('.display-inline');
    let date = cal.querySelector('.xdsoft_date.xdsoft_current');
    let time = cal.querySelector('.xdsoft_time.xdsoft_current');

    await click('#reset');

    let newText = find('.display-inline .text').textContent;

    assert.notStrictEqual(newText, originalText);

    await waitUntil(() => {
      return cal.querySelector('.xdsoft_date.xdsoft_current') !== date
        && cal.querySelector('.xdsoft_time.xdsoft_current') !== time;
    });

    assertInitialDateTime(assert);
  });
});
