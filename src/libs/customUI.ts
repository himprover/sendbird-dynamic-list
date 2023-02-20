import {Component} from 'src/types/component';

export type UseStateType<T> = (
  initState: T
) => [state: T, setState: SetStateType<T>];
export type SetStateType<T> = (state: T) => void;

export interface CustomContextProps {
  states: any[];
  target?: HTMLElement;
  component?: Component<any>;
  props?: any;
  currentStateCount: number;
  renderCount: number;
}

function CustomUI() {
  const context: CustomContextProps = {
    states: [],
    target: undefined,
    component: undefined,
    currentStateCount: 0,
    renderCount: 0,
  };
  function useState<T>(initState: T): [state: T, setState: SetStateType<T>] {
    const {currentStateCount, states} = context;

    if (states.length === currentStateCount) {
      states.push(initState);
    }

    const state = states[currentStateCount];

    function setState(newState: T) {
      if (
        state === newState ||
        JSON.stringify(newState) === JSON.stringify(state)
      ) {
        return;
      }

      states[currentStateCount] = newState;
      _render();
    }
    context.currentStateCount += 1;
    return [state, setState];
  }

  function _render() {
    const {target, component, props} = context;

    if (!target || !component) {
      return;
    }
    target.innerHTML = '';
    target.appendChild(component(props).render());
    context.currentStateCount = 0;
    context.renderCount += 1;
  }

  function render(target: HTMLElement, component: Component<any>, props?: any) {
    context.target = target;
    context.component = component;
    context.props = props;
    _render();
  }
  return {useState, render};
}

export const {useState, render} = CustomUI();
