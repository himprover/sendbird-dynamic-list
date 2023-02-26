import {List} from 'src/components/List';
import {Component} from 'src/types';
import {useState} from 'src/libs/customUI';

const exampleData = Array.from({length: 100}, (_, index) => ({
  sequence: index + 1,
  content: `hello I'm ${index + 1}.`,
}));

export const MainPage: Component<void> = () => {
  const [list, _setList] = useState(exampleData);

  return List({list: list});
};
