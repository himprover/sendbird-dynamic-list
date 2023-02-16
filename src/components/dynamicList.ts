import './dynamicList.css';

import {Background} from './Background';
import {Element, ElementInitProps} from './Element';
import {ListItem} from './ListItem';

interface ListItemProps {
  sequence: number;
  content: string;
}

export class DynamicList extends Element {
  activeList: ListItem | undefined;
  background: Background;
  constructor(props: ElementInitProps) {
    super(props);
    this.setClass('dynamic-list');
    this.background = new Background().addClass('off').on('click', () => {
      this.backgroundOff();
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
          this.backgroundOn();
          this.activeList = list;
        });

        this.appendElement(list);
      }
    }
    return this;
  }

  backgroundOn() {
    document.body.classList.add('no-scroll');
    this.background.removeClass('off').addClass('on');
    return this;
  }

  backgroundOff() {
    document.body.classList.remove('no-scroll');
    this.background.removeClass('on').addClass('off');
    return this;
  }
}
