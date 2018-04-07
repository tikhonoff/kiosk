/**
*
* Manager
*
*/

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavBar, { Brand, NavItem } from './NavBar';

const Container = styled.div`
  width: 960px;
  margin: 0 auto;
`;

function Manager({ children }) {
  return (
    <div>
      <NavBar>
        <Container>
          <Brand to="/manager">Manager</Brand>

          <NavItem to="/manager/create">
            Create
          </NavItem>
        </Container>
      </NavBar>

      <Container>{Children.toArray(children)}</Container>
    </div>
  );
}

Manager.propTypes = {
  children: PropTypes.any,
};

export default Manager;
export {
  Container,
};
