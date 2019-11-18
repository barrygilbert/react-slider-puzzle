import React from 'react';
import { shallow } from 'enzyme';
import ControlBar from './';

describe('<ControlBar />', () => {
  it('passes className', () => {
    const className = 'asdfasdf';
    const tree = shallow(
      <ControlBar
        className={className}
        onChange={jest.fn()}
        onNewSize={jest.fn()}
      />
    );
    expect(tree.find(`.${className}`).length).toEqual(1);
  });
});
