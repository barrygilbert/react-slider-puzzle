import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ControlBar from 'components/molecules/ControlBar';
import PuzzleRow from 'components/molecules/PuzzleRow';

const PuzzleWrapper = styled.div`
  border: 5px solid #75576d;
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: 20px auto 0;
  background: #694e56;
`;

const StyledControlBar = styled(ControlBar)`
  margin-bottom: 5px;
  color: #eee;
`;

export const transposeArray = (array) =>
  array[0].map((col, i) => array.map(row => row[i]));

export default class Puzzle extends React.Component {
  static propTypes = {
    defaultSize: PropTypes.number,
  };
  constructor(props) {
    super(props);
    const size = props.defaultSize ? props.defaultSize : 4;
    this.state = {
      puzzle: this.initPuzzle(size),
      moves: 0,
      winner: false,
      size,
    };
  }

  initPuzzle(size) {
    let count = 0;
    const puzzle = [];
    const last = size ** 2;
    for(let i=0;i<size;i++) {
      const row = [];
      for(let j=0;j<size;j++) {
        count++;
        if (count === last) {
          row.push(null);
        } else {
          row.push(count);
        }
      }
      puzzle.push(row);
    }
    return puzzle;
  }

  findPiece(piece) {
    const { puzzle } = this.state;
    const rowCount = puzzle.length;
    for(let row = 0; row < rowCount; row += 1) {
      const col = puzzle[row].indexOf(piece);
      if (col !== -1) {
        return { row, col };
      }
    }
    return {
      row: -1,
      col: -1,
    };
  }

  onPieceClick = (piece, callback) => {
    const { puzzle, moves } = this.state;
    if (piece === null) {
      return;
    }
    const { row, col } = this.findPiece(piece);
    const { row: nullRow, col: nullCol } = this.findPiece(null);

    if (row !== nullRow && col !== nullCol) {
      return;
    }
    const newState = {};

    if (row === nullRow) {
      const newRow = [...puzzle[row]];
      newRow.splice(nullCol, 1);
      newRow.splice(col, 0, null);
      newState.puzzle = puzzle.map(
        (oldRow, idx) => idx === row ? newRow : oldRow
      );
      newState.moves = moves + Math.abs(col - nullCol);
    } else {
      const transposedArray = transposeArray(puzzle);
      const newRow = [...transposedArray[col]];
      newRow.splice(nullRow, 1);
      newRow.splice(row, 0, null);
      const newTransposedPuzzle = transposedArray.map(
        (oldRow, idx) => idx === col ? newRow : oldRow
      );
      newState.puzzle = transposeArray(newTransposedPuzzle);
      newState.moves = moves + Math.abs(row - nullRow);
    }
    newState.winner = !callback && this.checkPuzzle(newState.puzzle);
    this.setState(newState, callback);
  }

  checkPuzzle(puzzle) {
    const { size } = this.state;
    const last = size ** 2;
    let rowIdx;
    let colIdx;
    let count = 1;
    for(rowIdx = 0; rowIdx < size; rowIdx += 1) {
      for(colIdx = 0; colIdx < size; colIdx += 1) {
        if (puzzle[rowIdx][colIdx] !== count) {
          return false;
        }
        count += 1;
        if (count === last) {
          return true;
        }
      }
    }
  }

  shuffle = () => {
    const { size } = this.state;
    let counter = Math.min(1000, size ** 2 * 20);
    this.setState({ moves: -counter * size });
    const shuffleOnce = () => {
      setTimeout(() => {
        const { puzzle } = this.state;
        const rows = puzzle.length;
        const cols = puzzle[0].length;
        counter--;
        if (counter === 0) {
          return this.setState({ moves: 0 });
        }
        const { row: nullRow, col: nullCol } = this.findPiece(null);
        if (Math.random() < 0.5) {
          let newCol = nullCol;
          while(newCol === nullCol) {
            newCol = Math.floor(Math.random() * cols);
          }
          this.onPieceClick(puzzle[nullRow][newCol], shuffleOnce);
        } else {
          let newRow = nullRow;
          while(newRow === nullRow) {
            newRow = Math.floor(Math.random() * rows);
          }
          this.onPieceClick(puzzle[newRow][nullCol], shuffleOnce);
        }
      }, 0);
    };
    shuffleOnce();
  }

  onNewSize = size => {
    this.setState({
      size,
      puzzle: this.initPuzzle(size),
    });
  }

  render() {
    const { puzzle, moves, winner, size } = this.state;
    return (
      <>
        <PuzzleWrapper>
          <StyledControlBar
            onShuffle={this.shuffle}
            moveCount={!!moves && moves > 0 ? moves : 0}
            size={size}
            onNewSize={this.onNewSize}
          />
          {winner && <div>Winner!!!</div>}
          {puzzle.map(row => (
            <PuzzleRow
              pieces={row}
              onClick={this.onPieceClick}
              key={JSON.stringify(row)}
            />
          ))}
        </PuzzleWrapper>
      </>
    );
  }
}
