import React from 'react';
import { shallow, mount } from 'enzyme';
import PuzzlePiece, { StyledPiece } from './';

describe('<PuzzlePiece />', () => {
  it('renders the piece\'s value', () => {
    const value = 100;
    const onClick = jest.fn();
    const tree = shallow(<PuzzlePiece piece={value} onClick={onClick} />);
    expect(tree.text().indexOf(value.toString())).not.toEqual(-1);
  });
  it('passes piece prop to onClick', () => {
    const value = 100;
    const onClick = jest.fn();
    const tree = mount(<PuzzlePiece piece={value} onClick={onClick} />);
    tree.simulate('click');
    expect(onClick).toHaveBeenCalledWith(value);
    tree.unmount();
  });
  it('disables the blank', () => {
    const value = null;
    const onClick = jest.fn();
    const tree = mount(<PuzzlePiece piece={value} onClick={onClick} />);
    expect(tree.find(StyledPiece).props().disabled).toEqual(true);
    tree.unmount();
  });
});
