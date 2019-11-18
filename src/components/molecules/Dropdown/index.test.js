import React from 'react';
import { mount, shallow } from 'enzyme';
import Dropdown from './';

describe('<Dropdown />', () => {
  const value = 'asdfasdf';
  const onChange = jest.fn();
  let tree;
  let label = 'Yo Flash!';
  beforeEach(() => {
    onChange.mockReset();
    tree = shallow(
      <Dropdown
        selected={value}
        onChange={onChange}
        options={[value]}
        label={label}
      />
    );
  });
  it('renders the current selected', () => {
    expect(tree.text()).toContain(value);
  });
  it('toggles isOpen', () => {
    expect(tree.state('isOpen')).toEqual(false);
    tree.instance().toggleOpen();
    expect(tree.state('isOpen')).toEqual(true);
  });
  it('closes on command', () => {
    expect(tree.state('isOpen')).toEqual(false);
    tree.instance().toggleOpen();
    expect(tree.state('isOpen')).toEqual(true);
    tree.instance().close();
    expect(tree.state('isOpen')).toEqual(false);
  });
  it('sets the wrapperRef', () => {
    const refVal = 'fdsafdsa';
    label = '';
    tree.instance().createWrapperRef(refVal);
    expect(tree.instance().wrapperRef).toEqual(refVal);
  });
  it('fies onChange with the passed in value', () => {
    const val = 'fdsafdsa';
    tree.instance().onItemClick(val);
    expect(onChange).toHaveBeenCalledWith(val);
  });
  it('mounts and unmounts', () => {
    const { addEventListener, removeEventListener } = document;
    document.addEventListener = jest.fn();
    document.removeEventListener = jest.fn();
    const mountedTree = mount(
      <Dropdown selected={value} onChange={onChange} options={[value]} />
    );
    expect(document.addEventListener).toHaveBeenCalled();
    mountedTree.unmount();
    expect(document.removeEventListener).toHaveBeenCalled();
    document.addEventListener = addEventListener;
    document.removeEventListener = removeEventListener;
  });
  it('handleClick ignores clicking inside the wrapper', () => {
    const refVal = {
      contains: () => true,
    };
    tree.instance().createWrapperRef(refVal);
    tree.instance().toggleOpen();
    expect(tree.state('isOpen')).toBe(true);
    tree.instance().handleClick({ target: refVal });
    expect(tree.state('isOpen')).toBe(true);
  });
  it('handleClick stays the course if clicking outside the wrapper', () => {
    const refVal = {
      contains: () => false,
    };
    tree.instance().createWrapperRef(refVal);
    tree.instance().toggleOpen();
    expect(tree.state('isOpen')).toBe(true);
    tree.instance().handleClick({ target: refVal });
    expect(tree.state('isOpen')).toBe(false);
  });
  it(
    'handleClick skips if clicking outside the wrapper and already closed',
    () => {
      const refVal = {
        contains: () => false,
      };
      tree.instance().createWrapperRef(refVal);
      expect(tree.state('isOpen')).toBe(false);
      tree.instance().handleClick({ target: refVal });
      expect(tree.state('isOpen')).toBe(false);
    }
  );
});
