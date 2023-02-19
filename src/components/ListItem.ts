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

const MOUSE_ENTER_KEYFRAMES: ElementAnimationKeyframesType = [
  {transform: 'translateX(40px)'},
];
const MOUSE_ENTER_SIBLING_KEYFRAMES: ElementAnimationKeyframesType = [
  {transform: 'translateX(20px)'},
];

const MOUSE_LEAVE_KEYFRAMES: ElementAnimationKeyframesType = [
  {transform: 'translateX(0)'},
];

const MOUSE_EVENT_OPTIONS: ElementAnimationOptionsType = {
  duration: 300,
  easing: 'ease-in-out',
  fill: 'forwards',
};

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

const mouseEnterHandler = (Element: Element) => {
  const nextSibling = Element.getNextSibling();
  const prevSibling = Element.getPrevSibling();

  Element.setAnimation(MOUSE_ENTER_KEYFRAMES, MOUSE_EVENT_OPTIONS);

  nextSibling &&
    nextSibling.animate(MOUSE_ENTER_SIBLING_KEYFRAMES, MOUSE_EVENT_OPTIONS);
  prevSibling &&
    prevSibling.animate(MOUSE_ENTER_SIBLING_KEYFRAMES, MOUSE_EVENT_OPTIONS);
};

const mouseLeaveHandler = (Element: Element) => {
  const nextSibling = Element.getNextSibling();
  const prevSibling = Element.getPrevSibling();

  Element.setAnimation(MOUSE_LEAVE_KEYFRAMES, MOUSE_EVENT_OPTIONS);

  nextSibling &&
    nextSibling.animate(MOUSE_LEAVE_KEYFRAMES, MOUSE_EVENT_OPTIONS);
  prevSibling &&
    prevSibling.animate(MOUSE_LEAVE_KEYFRAMES, MOUSE_EVENT_OPTIONS);
};
