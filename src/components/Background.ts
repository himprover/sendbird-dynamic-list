import {Element} from './Element';
import './background.css';

export class Background extends Element {
  constructor() {
    super('div');
    this.setClass('background');
  }
}
