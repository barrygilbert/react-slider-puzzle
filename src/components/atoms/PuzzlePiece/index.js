import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const StyledPiece = styled.button`
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 25px;
  background: ${props => props.theme.backgroundB};
  border: 2px solid ${props => props.theme.backgroundA};
  color: ${props => props.theme.colorB};
  border-radius: 5px;
  cursor: ${({ disabled }) => disabled ? 'unset' : 'pointer'};
  margin: 1px;
  outline: none;
`;

export default class PuzzlePiece extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    piece: PropTypes.number,
    className: PropTypes.string,
  };
  onClick = () => {
    const { onClick, piece } = this.props;
    onClick(piece);
  }
  render() {
    const { piece, className } = this.props;
    return (
      <StyledPiece
        className={className}
        onClick={this.onClick}
        disabled={piece === null}
      >
        {piece}
      </StyledPiece>
    );
  }
}
