import './List.css';

import {Background} from './Background';
import {Element} from './Element';
import {ListItem} from './ListItem';

type ListTagType = 'ul' | 'ol';

interface ListItemProps {
  sequence: number;
  content: string;
}

export class List extends Element {
  activeList: ListItem | undefined;
  background: Background;
  constructor(props: ListTagType) {
    super(props);
    this.setClass('list');
    this.background = new Background().on('click', () => {
      this.background.hidden();
      this.activeList?.removeClass('active');
      this.activeList = undefined;
    });
    this.appendElement(this.background);
  }

  addList(props: ListItemProps[]) {
    if (this.$) {
      for (const item of props) {
        const list = new ListItem(item.sequence, item.content, 'li');
        list.on(
          'focus',
          () => !list.hasClass('focus') && list.addClass('focus')
        );
        list.on(
          'blur',
          () => list.hasClass('focus') && list.removeClass('focus')
        );
        list.on(
          'mouseover',
          () =>
            !list.hasClass('focus') &&
            !list.hasClass('active') &&
            list.addClass('focus')
        );
        list.on('mouseout', () => {
          list.hasClass('focus') && list.removeClass('focus');
        });
        list.on('click', () => {
          list.removeClass('focus').addClass('active');
          this.background.show();
          this.activeList = list;
        });

        this.appendElement(list);
      }
    }
    return this;
  }
}
