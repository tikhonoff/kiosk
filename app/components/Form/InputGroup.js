/**
*
* Form
*
*/

import React, { Children } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Input from './Input';
import Label from './Label';

const Styled = styled.div`
  margin-bottom: 15px;
`;

function InputGroup({ type, onChange, danger, success, label, value, children }) {
  return (
    <Styled
      className={cx({
        danger,
        success,
      })}
    >
      <Label>
        {Children.toArray(label)}
      </Label>

      <Input
        type={type}
        onChange={onChange}
        value={value}
        className={cx({
          danger,
          success,
        })}
      />
      {children && Children.toArray(children)}
    </Styled>
  );
}

InputGroup.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  danger: PropTypes.bool,
  success: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.any, // React.Node || string
  children: PropTypes.any,
};

export default InputGroup;
