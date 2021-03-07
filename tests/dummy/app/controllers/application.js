import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const initialDatetime = new Date('12/25/1994 13:35');

export default class ApplicationController extends Controller {
  @tracked shouldShow = true;
  @tracked initialDatetime = initialDatetime;
  @tracked datetime;

  @action toggleShow() {
    this.shouldShow = !this.shouldShow;
  }

  @action reset() {
    Object.assign(this, {
      initialDatetime,
      datetime: undefined
    });
  }
}
