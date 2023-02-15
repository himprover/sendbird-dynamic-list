import {Element, ElementInitProps} from './element';

export class List extends Element {
  sequence: number;
  content: string;

  constructor(sequence: number, content: string, props: ElementInitProps) {
    super(props);
    this.setClass('list');
    this.sequence = sequence;
    this.content = content;

    const sequenceText = new Element('span');
    sequenceText.setClass('sequence-text');
    sequenceText.val(`${sequence}`);
    this.appendElement(sequenceText);

    const contentText = new Element('span');
    contentText.setClass('content-text');
    contentText.val(content);
    this.appendElement(contentText);
  }
}
