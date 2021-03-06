/**
*
* Form
*
*/

import React, { Children } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Select from './Select';
import Label from './Label';

const Styled = styled.div`
  margin-bottom: 15px;
`;

function SelectGroup({ onChange, danger, success, label, value, options }) {
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

      <Select
        onChange={onChange}
        value={value}
        className={cx({
          danger,
          success,
        })}
        options={options}
      />
    </Styled>
  );
}

SelectGroup.propTypes = {
  onChange: PropTypes.func,
  danger: PropTypes.bool,
  success: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.any, // React.Node || string
  options: PropTypes.array,
};

export default SelectGroup;
