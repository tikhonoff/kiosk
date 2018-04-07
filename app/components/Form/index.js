/**
*
* Form
*
*/

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from './Input';
import InputGroup from './InputGroup';
import SelectGroup from './SelectGroup';

const Container = styled.div``;

function Form({ children }) {
  return (
    <Container>
      {Children.toArray(children)}
    </Container>
  );
}

Form.propTypes = {
  children: PropTypes.any,
};

export default Form;
export {
  Input,
  InputGroup,
  SelectGroup,
};
