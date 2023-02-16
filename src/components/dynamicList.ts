import {Element, ElementInitProps} from './element';
import {List} from './list';

export class DynamicList extends Element {
  list: List[];
  constructor(props: ElementInitProps) {
    super(props);
    this.setClass('dynamic-list');
    this.list = [];
  }

  addList(content: string[]) {
    if (this.$) {
      for (const item of content) {
        const list = new List(this.list.length + 1, item, 'li');
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
          () => !list.hasClass('focus') && list.addClass('focus')
        );
        list.on('mouseout', () => {
          list.hasClass('focus') && list.removeClass('focus');
        });
        list.on(
          'click',
          () => !list.hasClass('active') && list.addClass('active')
        );

        this.list.push(list);
        this.appendElement(list);
      }
    }
  }

  deleteList(sequence: number) {
    this.list = [...this.list.slice(0, sequence), ...this.list.slice(sequence)];
  }
}
