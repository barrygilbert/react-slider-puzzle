import React from 'react';
import { shallow } from 'enzyme';
import DropdownItem from './';

describe('<DropdownItem />', () => {
  it('renders a value', () => {
    const value = 'asdfasdf';
    const tree = shallow(<DropdownItem value={value} onClick={jest.fn()} />);
    expect(tree.text().indexOf(value)).not.toEqual(-1);
  });
  it('calls onClick with the value on element click', () => {
    const value = 'asdfasdf';
    const onClick = jest.fn();
    const tree = shallow(<DropdownItem value={value} onClick={onClick} />);
    tree.simulate('click');
    expect(onClick).toHaveBeenCalledWith(value);
  });
});
