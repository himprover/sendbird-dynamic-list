import {Element} from 'src/components/Element';

type Component<T> = (props: T) => Element | null;

interface ComponentEventProps {
  onClick?: GlobalEventHandlers['onclick'];
  onKeyDown?: GlobalEventHandlers['onkeydown'];
  onMouseEnter?: GlobalEventHandlers['onmouseenter'];
  onMouseLeave?: GlobalEventHandlers['onmouseleave'];
  onFocus?: GlobalEventHandlers['onfocus'];
  onBlur?: GlobalEventHandlers['onblur'];
}
