import {Component} from 'src/types/component';
import {Element} from './Element';
import './background.css';

export interface BackgroundProps {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
}

export const Background: Component<BackgroundProps> = ({isShow, setIsShow}) => {
  const Wrap = new Element('div').setClass('background');
  Wrap.setAttr('tabindex', '0');

  const changeBackgroundToShow = () => {
    document.body.classList.add('no-scroll');
    Wrap.removeClass('hidden').addClass('show');
    setIsShow(true);
  };
  const changeBackgroundToHidden = () => {
    document.body.classList.remove('no-scroll');
    Wrap.removeClass('show').addClass('hidden');
    setIsShow(false);
  };

  isShow ? changeBackgroundToShow() : changeBackgroundToHidden();

  Wrap.on('click', () => changeBackgroundToHidden());
  Wrap.on('keydown', (event: any) => event.key === 'Enter' && setIsShow(false));

  return Wrap;
};
