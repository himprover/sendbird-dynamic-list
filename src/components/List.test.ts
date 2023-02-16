import {List} from './List';
import {ListItemProps} from './ListItem';
import userEvent from '@testing-library/user-event';
import {getByText} from '@testing-library/dom';

describe('[COMPONENT] List test', () => {
  const list = new List('ul');

  test('add and show 10 listItem test', () => {
    // given
    const listItem: ListItemProps[] = Array.from({length: 10}, (_, index) => ({
      sequence: index + 1,
      content: `item-${index + 1}`,
    }));

    // when
    list.addList(listItem);

    // then
    expect(list.$!).toHaveTextContent('item-1');
    expect(list.$!).toHaveTextContent('item-10');
  });

  test('add focus class when mouseover on list item', async () => {
    // given
    const exampleListItem = getByText(list.$!, 'item-1').parentElement!
      .parentElement;

    // when
    await userEvent.hover(exampleListItem!);

    // then
    expect(exampleListItem!.classList.contains('focus')).toBeTruthy();
  });

  test('remove focus class when mouseout on list item', async () => {
    // given
    const exampleListItem = getByText(list.$!, 'item-1').parentElement!
      .parentElement;
    await userEvent.hover(exampleListItem!);

    // when
    await userEvent.unhover(exampleListItem!);

    // then
    expect(exampleListItem!.classList.contains('focus')).toBeFalsy();
  });

  test('show popup when click to list item', async () => {
    // given
    const exampleListItem = getByText(list.$!, 'item-1').parentElement!
      .parentElement;

    // when
    await userEvent.click(exampleListItem!);

    // then
    expect(exampleListItem!.classList.contains('active')).toBeTruthy();
  });

  test('show background when click to list item', async () => {
    // given
    const exampleListItem = getByText(list.$!, 'item-1').parentElement!
      .parentElement;

    // when
    await userEvent.click(exampleListItem!);

    // then
    expect(list.background.hasClass('show')).toBeTruthy();
  });

  test('hidden popup when click to background', async () => {
    // given
    const exampleListItem = getByText(list.$!, 'item-1').parentElement!
      .parentElement;
    await userEvent.click(exampleListItem!);

    // when
    await userEvent.click(list.background.$!);

    // then
    expect(exampleListItem!.classList.contains('active')).toBeFalsy();
  });

  test('hidden background when click to background', async () => {
    // given
    const exampleListItem = getByText(list.$!, 'item-1').parentElement!
      .parentElement;
    await userEvent.click(exampleListItem!);

    // when
    await userEvent.click(list.background.$!);

    // then
    expect(list.background.hasClass('hidden')).toBeTruthy();
  });
});
