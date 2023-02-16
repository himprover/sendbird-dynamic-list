export type ElementInitProps =
  | Element
  | HTMLElement
  | ElementSupportTagType
  | undefined;

type ElementSupportTagType = 'div' | 'ul' | 'ol' | 'li' | 'span';
type ElementSupportEventType =
  | 'click'
  | 'mouseover'
  | 'mouseout'
  | 'focus'
  | 'blur';

/**
 * return this for method chaning
 */
export class Element {
  $: HTMLElement | undefined;

  constructor(props: ElementInitProps) {
    if (props === undefined) {
      let tag = 'div';
      this.$ = document.createElement(tag);
    } else if (props instanceof HTMLElement) {
      this.$ = props;
    } else if (props instanceof Element) {
      this.$ = props.$;
    } else {
      let tag = props;
      this.$ = document.createElement(`${tag}`);
    }
  }

  on(type: ElementSupportEventType, handler: EventListener) {
    if (this.$) {
      this.$.addEventListener(type, handler);
    }
    return this;
  }

  hasClass(className: string) {
    if (this.$?.classList) {
      return this.$.classList.contains(className);
    }
    return false;
  }

  setClass(...className: string[]) {
    if (this.$) {
      this.$.className = className.join(' ');
    }
    return this;
  }

  addClass(...className: string[]) {
    if (this.$) {
      for (const name of className) {
        !this.$.classList.contains(name) && this.$.classList.add(name);
      }
    }
    return this;
  }

  removeClass(...className: string[]) {
    if (this.$) {
      for (const name of className) {
        this.$.classList.contains(name) && this.$.classList.remove(name);
      }
    }
    return this;
  }

  setStyle(style: string, value: string, unit: string = '') {
    if (this.$) {
      this.$.style[style as any] = `${value}${unit}`;
    }
    return this;
  }

  val(value: string) {
    if (this.$) {
      this.$.innerHTML = value;
    }
    return this;
  }

  setAttr(key: string, value: string) {
    if (this.$) {
      this.$.setAttribute(key, value);
    }
    return this;
  }

  getAttr(key: string) {
    if (this.$) {
      return this.$.getAttribute(key);
    }
    return undefined;
  }

  removeAttr(key: string) {
    if (this.$) {
      this.$.removeAttribute(key);
    }
    return this;
  }

  appendElement(element: HTMLElement | Element) {
    if (this.$) {
      if (element instanceof HTMLElement) {
        this.$.appendChild(element);
      } else {
        this.$.appendChild(element.$!);
      }
    }

    return this;
  }

  removeElement(element: HTMLElement | Element) {
    if (this.$) {
      if (element instanceof HTMLElement) {
        this.$.removeChild(element);
      } else {
        this.$.removeChild(element.$!);
      }
    }
    return this;
  }

  focus() {
    if (this.$) {
      this.$.focus();
    }
    return this;
  }

  blur() {
    if (this.$) {
      this.$.blur();
    }
    return this;
  }

  click() {
    if (this.$) {
      this.$.click();
    }
    return this;
  }
}
