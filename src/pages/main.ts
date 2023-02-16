import './main.css';

import {DynamicList} from 'src/components/dynamicList';

export const MainPage = () => {
  const main = document.getElementById('root');

  const dynamicList = new DynamicList('ul');
  const exampleData = Array.from({length: 100}, (_, index) => ({
    sequence: index + 1,
    content: `hello I'm ${index + 1}.`,
  }));
  dynamicList.addList(exampleData);

  if (dynamicList.$) {
    main?.appendChild(dynamicList.$);
  }
};
