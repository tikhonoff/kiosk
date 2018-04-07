/**
*
* Manager NavBar
*
*/

// import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.div`
  background: #fff;
  border-bottom: 1px solid rgba(0, 40, 100, 0.12);
  height: 50px;
  line-height: 50px;
  margin-bottom: 20px;
`;

const Brand = styled(Link)`
  font-size: 18px;
  color: #333;
  text-decoration: none;
  transition: opacity .1s ease-in-out;
  margin-right: 30px;
  &:hover {
    opacity: .8;
  }
`;

const NavItem = styled(NavLink).attrs({
  activeClassName: 'active',
})`
  font-size: 14px;
  text-decoration: none;
  color: #fff;
  display: inline-block;
  background-color: #6574cd;
  line-height: 16px;
  padding: 3px 7px;
  border-radius: 3px;
  transition: background-color .1s ease-in-out;
  margin-right: 10px;

  &.active,
  &:hover {
    background-color: #9ba7ec;
  }
`;

export default NavBar;
export {
  Brand,
  NavItem,
};
