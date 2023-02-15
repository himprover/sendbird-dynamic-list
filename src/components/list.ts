import {Element, ElementInitProps} from './element';

export class List extends Element {
  sequence: number;
  content: string;

  constructor(sequence: number, content: string, props: ElementInitProps) {
    super(props);
    this.setClass('list');
    this.sequence = sequence;
    this.content = content;

    // It's only use to style
    const container = new Element('div');
    container.setClass('list-container');
    this.appendElement(container);

    const sequenceText = new Element('span');
    sequenceText.setClass('sequence-text');
    sequenceText.val(`${sequence}`);
    container.appendElement(sequenceText);

    const contentText = new Element('span');
    contentText.setClass('content-text');
    contentText.val(content);
    container.appendElement(contentText);
  }
}
