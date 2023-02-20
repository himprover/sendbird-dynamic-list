export type ElementInitProps = Element | HTMLElement | ElementSupportTagType;

type ElementSupportTagType = 'div' | 'ul' | 'ol' | 'li' | 'span';
type ElementSupportEventType =
  | 'click'
  | 'mouseenter'
  | 'mouseleave'
  | 'focus'
  | 'blur'
  | 'keydown';

export type ElementAnimationKeyframesType =
  | Keyframe[]
  | PropertyIndexedKeyframes
  | null;

export type ElementAnimationOptionsType = number | KeyframeAnimationOptions;

// return this for method chaning
export class Element {
  private $: HTMLElement;

  constructor(props: ElementInitProps) {
    if (props === undefined) {
      let tag = 'div';
      this.$ = document.createElement(tag);
    } else if (props instanceof HTMLElement) {
      this.$ = props;
    } else if (props instanceof Element) {
      this.$ = props.render();
    } else {
      let tag = props;
      this.$ = document.createElement(`${tag}`);
    }
  }

  on(type: ElementSupportEventType, handler: EventListener) {
    this.$.addEventListener(type, handler);
    return this;
  }

  hasClass(className: string) {
    if (this.$?.classList) {
      return this.$.classList.contains(className);
    }
    return false;
  }

  setClass(...className: string[]) {
    this.$.className = className.join(' ');
    return this;
  }

  addClass(...className: string[]) {
    for (const name of className) {
      !this.$.classList.contains(name) && this.$.classList.add(name);
    }
    return this;
  }

  removeClass(...className: string[]) {
    for (const name of className) {
      this.$.classList.contains(name) && this.$.classList.remove(name);
    }
    return this;
  }

  setStyle(style: string, value: string, unit: string = '') {
    this.$.style[style as any] = `${value}${unit}`;
    return this;
  }

  val(value: string) {
    this.$.innerHTML = value;
    return this;
  }

  setAttr(key: string, value: string) {
    this.$.setAttribute(key, value);
    return this;
  }

  getAttr(key: string) {
    return this.$.getAttribute(key);
  }

  removeAttr(key: string) {
    this.$.removeAttribute(key);
    return this;
  }

  appendElement(element: HTMLElement | Element) {
    if (element instanceof HTMLElement) {
      this.$.appendChild(element);
    } else {
      this.$.appendChild(element.render());
    }
    return this;
  }

  removeElement(element: HTMLElement | Element) {
    if (element instanceof HTMLElement) {
      this.$.removeChild(element);
    } else {
      this.$.removeChild(element.render());
    }
    return this;
  }

  focus() {
    this.$.focus();
    return this;
  }

  blur() {
    this.$.blur();
    return this;
  }

  click() {
    this.$.click();
    return this;
  }

  render() {
    return this.$;
  }

  setAnimation(
    keyframes: ElementAnimationKeyframesType,
    options: ElementAnimationOptionsType
  ) {
    this.$.animate(keyframes, options);
    return this;
  }

  getNextSibling() {
    return this.$.nextElementSibling;
  }
  getPrevSibling() {
    return this.$.previousElementSibling;
  }
}
