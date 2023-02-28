import {Component} from 'src/types';
import {Element} from './Element';
import './background.css';

export interface BackgroundProps {
  show?: boolean;
  onClick?: EventListener;
  onKeyDown?: EventListener;
}

export const Background: Component<BackgroundProps> = props => {
  const Wrap = new Element('div')
    .setClass('background')
    .setAttr('tabindex', '0');

  const {
    show = false,
    onClick: onClickHandler,
    onKeyDown: onKeyDownHandler,
  } = props;

  onClickHandler && Wrap.on('click', onClickHandler);
  onKeyDownHandler && Wrap.on('keydown', onKeyDownHandler);

  return show ? Wrap : null;
};
