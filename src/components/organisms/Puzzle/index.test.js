import React from 'react';
import { mount } from 'enzyme';
import Puzzle, { transposeArray } from './';

jest.useFakeTimers();

describe('<Puzzle />', () => {
  it('renders a 4x4 puzzle by default', () => {
    const tree = mount(
      <Puzzle />
    );
    const text = tree.text();
    expect(text.indexOf('Size: 4123456789101112131415')).not.toBe(-1);
    tree.unmount();
  });
  it('renders a 10x10 puzzle', () => {
    const tree = mount(
      <Puzzle defaultSize={10} />
    );
    const text = tree.text();
    expect(text.indexOf('979899')).not.toBe(-1);
    tree.unmount();
  });
  it('changes size', () => {
    const tree = mount(
      <Puzzle defaultSize={4} />
    );
    tree.instance().onNewSize(5);
    expect(tree.state('size')).toBe(5);
    tree.unmount();
  });
  it('findPiece', () => {
    const tree = mount(
      <Puzzle defaultSize={4} />
    );
    expect(tree.instance().findPiece(1)).toEqual({ row: 0, col: 0 });
    expect(tree.instance().findPiece(null)).toEqual({ row: 3, col: 3 });
    expect(tree.instance().findPiece(16)).toEqual({ row: -1, col: -1 });
    tree.unmount();
  });
  it('shuffles', () => {
    const tree = mount(
      <Puzzle defaultSize={4} />
    );
    tree.instance().shuffle();
    jest.runAllTimers();
    expect(tree.instance().findPiece(null)).not.toEqual({ row: 3, col: 3 });
    tree.unmount();
  });
  it('onPieceClick', () => {
    const tree = mount(
      <Puzzle defaultSize={4} />
    );
    const defaultPuzzle = tree.state('puzzle');
    tree.instance().onPieceClick(null);
    expect(tree.state('puzzle')).toEqual(defaultPuzzle);
    tree.instance().onPieceClick(1);
    expect(tree.state('puzzle')).toEqual(defaultPuzzle);
    tree.instance().onPieceClick(4);
    expect(tree.state('puzzle')).not.toEqual(defaultPuzzle);
    tree.instance().onPieceClick(12);
    expect(tree.state('puzzle')).toEqual(defaultPuzzle);
    expect(tree.state('winner')).toBe(true);
    tree.unmount();
  });
});

describe('transposeArray', () => {
  it('copies over 3x3 array', () => {
    const input = [
      [1, 1, 1],
      [2, 2, 2],
      [3, 3, 3],
    ];
    const output = [
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    ];
    expect(transposeArray(input)).toEqual(output);
  });
});
