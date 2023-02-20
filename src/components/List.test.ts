import {List} from './List';
import {ListItemProps} from './ListItem';
// import userEvent from '@testing-library/user-event';
// import {getByText} from '@testing-library/dom';
import {render} from 'src/libs/customUI';

describe('[COMPONENT] List test', () => {
  const App = document.createElement('div');
  App.setAttribute('id', 'root');

  test('add and show 10 listItem test', () => {
    // given
    const listItem: ListItemProps[] = Array.from({length: 10}, (_, index) => ({
      sequence: index + 1,
      content: `item-${index + 1}`,
    }));

    // when
    render(App, List, {list: listItem});

    // then
    expect(App).toHaveTextContent('item-1');
    expect(App).toHaveTextContent('item-10');
  });
});
