import {Background} from './Background';

describe('[COMPONENT] Background test', () => {
  test('show method test', () => {
    //when
    const background = new Background('hidden');
    expect(background.hasClass('show')).toBeFalsy();

    //then
    expect(background.show().hasClass('show')).toBeTruthy();
  });

  test('hidden method test', () => {
    //when
    const background = new Background('show');
    expect(background.hasClass('hidden')).toBeFalsy();

    //then
    expect(background.hidden().hasClass('hidden')).toBeTruthy();
  });
});
