/**
*
* Form
*
*/

/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
// import cx from 'classnames';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import styled from 'styled-components';

import List from './index';

const Styled = styled.div.attrs({})`
  padding: 10px;
  padding-right: 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background: #fbfbfb;
  }
`;

const Childrens = styled.div`
  margin-top: 5px;
  >div {
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const Title = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: #333;

  &:hover {
    text-decoration: underline;
  }
`;

const RightBlock = styled.div`
  float: right;
  padding-right: 10px;
`;

function ListItem({ virtualizedProps, slide }) {
  return (
    <Styled
      key={virtualizedProps.key}
    >
      {!slide.parent &&
        <span><span style={{ color: 'gray' }}>Root</span>{' '}</span>
      }
      <Title to={`/manager/view/${slide._id}`}>{slide.title}</Title>
      <RightBlock>
        <Button>Remove</Button>
      </RightBlock>
      {slide.childrens && slide.childrens.length > 0 &&
        <Childrens>
          <List
            slides={slide.childrens}
          />
        </Childrens>
      }
    </Styled>
  );
}

ListItem.propTypes = {
  virtualizedProps: PropTypes.object.isRequired,
  slide: PropTypes.object.isRequired,
};

export default ListItem;
