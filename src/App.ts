import {MainPage} from './pages/main';
import {Component} from './types';
import './styles/globalStyle.css';

export const App: Component<void> = () => {
  return MainPage();
};
