import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logotype from '../../images/logoSOS.png';
import logotype2 from '../../images/logoLHS.png';

const Container = styled.div`
  overflow: hidden;
`;

const Logotype = styled.div`
  background: url(${logotype}) no-repeat;
  background-size: contain;
  width: 325px;
  height: 150px;
  float: left;
`;

const RgtLogotype = styled.div`
  background: url(${logotype2}) no-repeat;
  background-size: contain;
  width: 325px;
  height: 150px;
  float: right;
`;

function Header() {
  return (
    <Container>
      <Logotype />
      <RgtLogotype />
    </Container>
  );
}

Header.propTypes = {
  children: PropTypes.any,
};

export default Header;
