import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Dropdown from 'components/molecules/Dropdown';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const sizes = [4, 5, 6, 7, 8, 9, 10];

const ControlBar = ({ className, moveCount, onNewSize, onShuffle, size }) => (
  <StyledWrapper className={className}>
    <div>Moves: {moveCount}</div>
    <button onClick={onShuffle}>Shuffle</button>
    <Dropdown
      selected={size}
      label="Size"
      options={sizes}
      onChange={onNewSize}
    />
  </StyledWrapper>
);

ControlBar.propTypes = {
  className: PropTypes.string,
  moveCount: PropTypes.number,
  onNewSize: PropTypes.func,
  onShuffle: PropTypes.func,
  size: PropTypes.number,
};

export default ControlBar;
