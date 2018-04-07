/**
*
* Form
*
*/

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { map } from 'lodash';

const Styled = styled.select.attrs({})`
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 40, 100, 0.12);
  border-radius: 3px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &.success {
    border-color: #5eba00;
  }

  &.danger {
    border-color: #cd201f;
  }
`;

function Select({ onChange, danger, success, value, options }) {
  return (
    <Styled
      onChange={onChange}
      value={value}
      className={cx({
        danger,
        success,
      })}
    >
      {map(options, (option) => <option key={option.key} value={option.value}>{option.text}</option>)}
    </Styled>
  );
}

Select.propTypes = {
  onChange: PropTypes.func,
  danger: PropTypes.bool,
  success: PropTypes.bool,
  value: PropTypes.string,
  options: PropTypes.array,
};

export default Select;
