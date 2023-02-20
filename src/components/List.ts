import './List.css';

import {Element} from './Element';
import {Component} from 'src/types/component';
import {ListItem, ListItemProps} from './ListItem';

export interface ListProps {
  list: ListItemProps[];
}

export const List: Component<ListProps> = props => {
  const Wrap = new Element('ul').setClass('list');

  props.list.forEach(value => {
    const item = ListItem(value) as Element;
    Wrap.appendElement(item);
  });

  return Wrap;
};
