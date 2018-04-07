/**
*
* Button
*
*/

import React, { Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Default = styled.button.attrs({
  type: 'button',
})`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 3px 5px;
  font-size: 12px;
  line-height: 12px;
  border-radius: 3px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: #2f66b3;
  border-color: #2c60a9;

  &:hover {
    color: #fff;
    background-color: #316cbe;
    border-color: #2f66b3;
    cursor: pointer;
  }
`;

function Button({ children, onClick, disabled }) {
  return (
    <Default
      onClick={onClick}
      disabled={!!disabled}
    >
      {Children.toArray(children)}
    </Default>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
