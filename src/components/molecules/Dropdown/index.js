import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DropdownItem from 'components/atoms/DropdownItem';

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 0;
  padding: 5px;
  background: ${props => props.theme.backgroundB};
  border: 1px solid ${props => props.theme.colorB};
  box-shadow: 3px 3px 6px 2px rgba(0, 0, 0, 0.5);
`;

export default class Dropdown extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    options: PropTypes.array,
    selected: PropTypes.any,
  }

  state = {
    isOpen: false,
  };

  toggleOpen = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  }

  close = () => {
    this.setState({
      isOpen: false,
    });
  }

  createWrapperRef = (ref) => {
    this.wrapperRef = ref;
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (e) => {
    if (!this.wrapperRef || this.wrapperRef.contains(e.target)) {
      return;
    }

    if (this.state.isOpen) {
      this.setState({
        isOpen: false,
      });
    }
  }

  onItemClick = (value) => {
    const { onChange } = this.props;
    this.close();
    onChange(value);
  }

  render() {
    const { label, options, selected } = this.props;
    const { isOpen } = this.state;

    return (
      <Wrapper ref={this.createWrapperRef}>
        <div onClick={this.toggleOpen}>
          {label}{label && ': '}
          {selected}
        </div>
        {isOpen && (
          <DropdownList>
            {options.map((value) => (
              <DropdownItem
                onClick={this.onItemClick}
                value={value}
                key={value}
              />
            ))}
          </DropdownList>
        )}
      </Wrapper>
    );
  }
}
