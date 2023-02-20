import {MainPage} from './pages/main';
import {Component} from './types/component';
import './styles/globalStyle.css';

export const App: Component<void> = () => {
  return MainPage();
};
