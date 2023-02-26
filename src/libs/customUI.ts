import {Component} from 'src/types';

export type UseStateType<T> = (
  initState: T
) => [state: T, setState: SetStateType<T>];
export type SetStateType<T> = (state: T | SetStateCallbackType<T>) => void;
export type SetStateCallbackType<T> = (currentState: T) => T;

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

    function setState(newState: T | SetStateCallbackType<T>) {
      let _newState = newState;

      if (isSetStateCallback(newState)) {
        _newState = newState(states[currentStateCount]);
      }

      if (!isStateChanged(_newState, state)) return;

      states[currentStateCount] = _newState;
      _render();
    }
    context.currentStateCount += 1;
    return [state, setState];
  }

  function _render() {
    const {target, component, props} = context;
    if (!target || !component) return;

    const Component = component(props);
    if (Component === null) return;

    target.innerHTML = '';
    target.appendChild(Component.render());
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

function isStateChanged<T>(currentState: T, newState: T) {
  if (
    currentState === newState ||
    JSON.stringify(currentState) === JSON.stringify(newState)
  )
    return false;

  return true;
}

function isSetStateCallback(args: any): args is SetStateCallbackType<any> {
  return args.call !== undefined;
}

export const {useState, render} = CustomUI();
