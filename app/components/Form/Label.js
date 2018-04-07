/**
*
* Label
*
*/

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = styled.label.attrs({})`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

function Label({ children }) {
  return (
    <Styled>
      {Children.toArray(children)}
    </Styled>
  );
}

Label.propTypes = {
  children: PropTypes.any,
};

export default Label;
