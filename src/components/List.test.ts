import {List} from './List';
import {ListItemProps} from './ListItem';
import userEvent from '@testing-library/user-event';
import {getByText} from '@testing-library/dom';
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

  test('add focus class when mouseover on list item', async () => {
    // given
    const listItem: ListItemProps[] = Array.from({length: 10}, (_, index) => ({
      sequence: index + 1,
      content: `item-${index + 1}`,
    }));
    render(App, List, {list: listItem});
    const exampleListItem = getByText(App, 'item-1').parentElement!
      .parentElement;

    // when
    await userEvent.hover(exampleListItem!);

    // then
    expect(exampleListItem!.classList.contains('focus')).toBeTruthy();
  });

  test('remove focus class when mouseout on list item', async () => {
    // given
    const listItem: ListItemProps[] = Array.from({length: 10}, (_, index) => ({
      sequence: index + 1,
      content: `item-${index + 1}`,
    }));
    render(App, List, {list: listItem});
    const exampleListItem = getByText(App, 'item-1').parentElement!
      .parentElement;

    // when
    await userEvent.unhover(exampleListItem!);

    // then
    expect(exampleListItem!.classList.contains('focus')).toBeFalsy();
  });

  test('show popup when click to list item', async () => {
    // given
    const listItem: ListItemProps[] = Array.from({length: 10}, (_, index) => ({
      sequence: index + 1,
      content: `item-${index + 1}`,
    }));
    render(App, List, {list: listItem});
    const exampleListItem = getByText(App, 'item-1').parentElement!
      .parentElement;

    // when
    await userEvent.click(exampleListItem!);

    // then
    const currentListItem = getByText(App, 'item-1').parentElement!
      .parentElement!;

    expect(currentListItem.classList.contains('active')).toBeTruthy();
  });
});

export {};
