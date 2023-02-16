import {Element} from './Element';
import './background.css';

export class Background extends Element {
  constructor() {
    super('div');
    this.setClass('background');
    this.addClass('show');
  }

  show() {
    document.body.classList.add('no-scroll');
    this.removeClass('hidden');
    this.addClass('show');
    return this;
  }
  hidden() {
    document.body.classList.remove('no-scroll');
    this.removeClass('show');
    this.addClass('hidden');
    return this;
  }
}
