import React from 'react';
import { mount, shallow } from 'enzyme';
import PuzzleRow from './';

describe('<PuzzleRow />', () => {
  const pieces = [1, 2, 3];
  it('passes className', () => {
    const className = 'asdfasdf';
    const tree = shallow(
      <PuzzleRow
        className={className}
        onClick={jest.fn()}
        pieces={pieces}
      />
    );
    expect(tree.find(`.${className}`).length).toEqual(1);
  });
  it('renders a few pieces', () => {
    const tree = mount(
      <PuzzleRow
        onClick={jest.fn()}
        pieces={pieces}
      />
    );
    expect(tree.text()).toEqual(pieces.join(''));
    tree.unmount();
  });
});
