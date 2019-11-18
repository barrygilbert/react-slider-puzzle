import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PuzzlePiece from 'components/atoms/PuzzlePiece';

const StyledRow = styled.div`
  display: flex;
  width: fit-content;
`;

const PuzzleRow = ({ className, pieces, onClick }) => (
  <StyledRow className={className}>
    {pieces.map(piece => (
      <PuzzlePiece piece={piece} onClick={onClick} key={piece} />
    ))}
  </StyledRow>
);

PuzzleRow.propTypes = {
  className: PropTypes.string,
  pieces: PropTypes.array,
  onClick: PropTypes.func,
};

export default PuzzleRow;
