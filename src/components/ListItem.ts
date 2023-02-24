import {Component} from 'src/types/component';
import {
  Element,
  ElementAnimationKeyframesType,
  ElementAnimationOptionsType,
} from './Element';
import {useState} from 'src/libs/customUI';
import {Background} from './Background';

export interface ListItemProps {
  sequence: number;
  content: string;
}

export const ListItem: Component<ListItemProps> = props => {
  const [isPopup, setIsPopup] = useState(false);

  const Wrap = new Element('li').setClass('list-item');
  const SequenceText = new Element('span').setClass('sequence-text');
  const ContentText = new Element('span').setClass('content-text');

  if (isPopup) {
    Wrap.addClass('active');
    document
      .getElementById('root')
      ?.appendChild(
        Background({isShow: isPopup, setIsShow: setIsPopup}).render()
      );
  } else {
    Wrap.on('mouseenter', () => mouseEnterHandler(Wrap));
    Wrap.on('focus', () => mouseEnterHandler(Wrap));

    Wrap.on('mouseleave', () => mouseLeaveHandler(Wrap));
    Wrap.on('blur', () => mouseLeaveHandler(Wrap));

    Wrap.on('click', () => {
      setIsPopup(true);
    });
    Wrap.on(
      'keydown',
      (event: any) => event.key === 'Enter' && setIsPopup(true)
    );
  }

  SequenceText.val(String(props.sequence));
  ContentText.val(props.content);
  Wrap.appendElement(SequenceText).appendElement(ContentText);
  Wrap.setAttr('tabindex', '0');

  return Wrap;
};

const TRANSLATE_X_40px: ElementAnimationKeyframesType = [
  {transform: 'translateX(40px)'},
];
const TRANSLATE_X_20px: ElementAnimationKeyframesType = [
  {transform: 'translateX(20px)'},
];
const TRANSLATE_X_0px: ElementAnimationKeyframesType = [
  {transform: 'translateX(0)'},
];
const EASEINOUT_FORWARDS_300ms: ElementAnimationOptionsType = {
  duration: 300,
  easing: 'ease-in-out',
  fill: 'forwards',
};

const mouseEnterHandler = (Element: Element) => {
  Element.setAnimation(TRANSLATE_X_40px, EASEINOUT_FORWARDS_300ms)
    .setAnimationNextSibling(TRANSLATE_X_20px, EASEINOUT_FORWARDS_300ms)
    .setAnimationPrevSibling(TRANSLATE_X_20px, EASEINOUT_FORWARDS_300ms);
};

const mouseLeaveHandler = (Element: Element) => {
  Element.setAnimation(TRANSLATE_X_0px, EASEINOUT_FORWARDS_300ms)
    .setAnimationNextSibling(TRANSLATE_X_0px, EASEINOUT_FORWARDS_300ms)
    .setAnimationPrevSibling(TRANSLATE_X_0px, EASEINOUT_FORWARDS_300ms);
};
