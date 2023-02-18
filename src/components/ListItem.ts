import {Component} from 'src/types/component';
import {Element} from './Element';
import {useState} from 'src/libs/customUI';
import {Background} from './Background';

export interface ListItemProps {
  sequence: number;
  content: string;
}

export const ListItem: Component<ListItemProps> = props => {
  const [isPopup, setIsPopup] = useState(false);

  const Wrap = new Element('li').setClass('list-item');
  const Container = new Element('div').setClass('list-item-container');
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
    Wrap.on('mouseover', () => Wrap.addClass('focus'));
    Wrap.on('mouseout', () => Wrap.removeClass('focus'));
    Wrap.on('focus', () => Wrap.addClass('focus'));
    Wrap.on('blur', () => Wrap.removeClass('focus'));
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
  Container.appendElement(SequenceText).appendElement(ContentText);
  Wrap.appendElement(Container);
  Wrap.setAttr('tabindex', '0');

  return Wrap;
};
