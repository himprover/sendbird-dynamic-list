import {Component, ComponentEventProps} from 'src/types';
import {
  Element,
  ElementAnimationKeyframesType,
  ElementAnimationOptionsType,
} from './Element';

export interface ListItemType {
  sequence: number;
  content: string;
}

export interface ListItemProps extends ComponentEventProps {
  item: ListItemType;
  isActive?: boolean;
}

export const ListItem: Component<ListItemProps> = props => {
  const Wrap = new Element('li').setClass('list-item').setAttr('tabindex', '0');
  const SequenceText = new Element('span').setClass('sequence-text');
  const ContentText = new Element('span').setClass('content-text');

  const {
    item,
    isActive = false,
    onClick: onClickHandler,
    onKeyDown: onKeyDownHandler,
  } = props;

  if (isActive) {
    Wrap.addClass('active');
  } else {
    /**
     * just animation, style
     */
    Wrap.on('mouseenter', () => mouseEnterHandler(Wrap));
    Wrap.on('focus', () => mouseEnterHandler(Wrap));
    Wrap.on('mouseleave', () => mouseLeaveHandler(Wrap));
    Wrap.on('blur', () => mouseLeaveHandler(Wrap));
  }

  /**
   * state change
   */
  onClickHandler && Wrap.on('click', onClickHandler);
  onKeyDownHandler && Wrap.on('keydown', onKeyDownHandler);

  SequenceText.val(`${item.sequence}`);
  ContentText.val(item.content);
  Wrap.appendElement(SequenceText).appendElement(ContentText);

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
