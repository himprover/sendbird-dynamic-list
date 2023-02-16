import './main.css';
import './dynamicList.css';

import {DynamicList} from 'src/components/dynamicList';

export const MainPage = () => {
  const main = document.getElementById('root');

  const dynamicList = new DynamicList('ul');
  const exampleData = Array.from(
    {length: 100},
    (_, index) => `hello I'm ${index}.`
  );
  dynamicList.addList(exampleData);

  if (dynamicList.$) {
    main?.appendChild(dynamicList.$);
  }
};
