import {Element} from './Element';
import './background.css';

type BackgroundProps = 'show' | 'hidden';
export class Background extends Element {
  constructor(props: BackgroundProps) {
    super('div');
    this.setClass('background');
    this.addClass(props);
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
