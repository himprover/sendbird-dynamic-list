import './List.css';

import {Element} from './Element';
import {Component} from 'src/types';
import {ListItem, ListItemProps, ListItemType} from './ListItem';
import {useState} from 'src/libs/customUI';
import {Background} from './Background';

export interface ListProps {
  list: ListItemType[];
}

export const List: Component<ListProps> = props => {
  const Wrap = new Element('ul').setClass('list');
  const {list} = props;
  const INIT_POPUP_STATE = Array.from({length: list.length}, () => false);
  const [popup, setPopup] = useState<boolean[]>(INIT_POPUP_STATE);

  list.forEach((value, index) => {
    const changePopupState = () => {
      setPopup(state => [
        ...state.slice(0, index),
        !state[index],
        ...state.slice(index + 1),
      ]);
    };
    const whenEnterKeyDown = (event: KeyboardEvent) => {
      event.code === 'Enter' && changePopupState();
    };
    const listItemProps: ListItemProps = {
      item: value,
      isActive: popup[index],
      onClick: popup[index] ? undefined : changePopupState,
      onKeyDown: popup[index] ? undefined : whenEnterKeyDown,
    };
    Wrap.appendElement(ListItem(listItemProps));
  });

  if (hasTrueFrom(popup)) {
    const PopupBackground = Background({
      show: true,
      onClick: () => {
        setPopup(INIT_POPUP_STATE);
      },
    });
    Wrap.appendElement(PopupBackground);
  }

  return Wrap;
};

const hasTrueFrom = (array: any[]) => !array.every(value => !value);
