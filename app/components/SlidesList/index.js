/**
*
* SlidesList
*
*/

/* eslint-disable no-underscore-dangle */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import ListItem from './ListItem';

const Wrapper = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  overflow: hidden;
`;

const WrapperAuto = styled.div`
  height: 100%;
`;

class SlidesList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <WrapperAuto>
          {map(this.props.slides, (slide) => (
            <ListItem
              key={slide._id}
              virtualizedProps={{
                key: slide._id,
                style: {},
              }}
              slide={slide}
            />
          ))}
        </WrapperAuto>
      </Wrapper>
    );
  }
}

SlidesList.propTypes = {
  slides: PropTypes.array.isRequired,
};

export default SlidesList;
