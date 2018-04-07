import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  background: #e0f0ff;
  border: 1px solid #000;
  padding: 15px;
  margin: 0 auto;
  text-align: center;
`;

function SlideBlock({ children }) {
  return (
    <Container>
      {Children.toArray(children)}
    </Container>
  );
}

SlideBlock.propTypes = {
  children: PropTypes.any,
};

export default SlideBlock;
