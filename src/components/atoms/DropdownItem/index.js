import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DropdownItem = styled.li`
  list-style-type: none;
  line-height: 1.2em;
  cursor: pointer;
`;

export default class DropdownItemComponent extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    value: PropTypes.any,
  };

  onClick = () => {
    const { onClick, value } = this.props;
    onClick(value);
  }

  render() {
    const { value } = this.props;
    return (
      <DropdownItem onClick={this.onClick}>
        {value}
      </DropdownItem>
    );
  }
}
