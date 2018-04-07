/**
*
* AppContainer
*
*/

/* eslint-disable no-underscore-dangle, react/jsx-no-bind */
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './Header';
import SlideBlock from './SlideBlock';
import seenCanvas from '../../js/sphere_control';

const Container = styled.div`

`;

const Columns = styled.div`
  display: flex;
  flex-direction: row;
`;

const Sidebar = styled.div`
  width: 20%;
`;

const SidebarContent = styled.div`
  padding: 15px;
  padding-top: 0;
`;

const Content = styled.div`
  width: 60%;
`;

const RightBar = styled.div`
  width: 20%;
`;

const RightBarContent = styled.div`
  padding: 10px;
  >h1 {
    color: #fff;
    margin: 0;
    text-align: center;
    line-height: 30px;
  }
`;

const SlideItemContainer = styled.div`
  margin-bottom: 5px;
  margin-left: ${(props) => (props.level + 1) * 5}px;
  height: 54px;
  border: thin solid gray;
  background-color: #f1f1f1;
  overflow: hidden;
  transition: all .1s linear;
  >img {
    width: auto;
    height: 100%;
    margin-right: 10px;
    float: left;
  }

  &:hover {
    background-color: #88ccff;
    cursor: pointer;
  }
`;

const SlidesItemTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  float: left;
`;

function SlidesItem({ slide, onClick }) {
  return (
    <SlideItemContainer onClick={onClick} level={slide.level}>
      {slide.icon && slide.icon.url &&
        <img src={slide.icon.url} alt={slide.title} />
      }
      <SlidesItemTitle>{slide.title}</SlidesItemTitle>
    </SlideItemContainer>
  );
}

SlidesItem.propTypes = {
  slide: PropTypes.object,
  onClick: PropTypes.func,
};

function SlidesList({ slides, onClick }) {
  return (
    <div>
      {slides.map((slide, index) => (
        <SlidesItem
          index={index}
          slide={slide}
          key={slide._id}
          onClick={onClick.bind(null, index)}
        />
      ))}
    </div>
  );
}

SlidesList.propTypes = {
  slides: PropTypes.array,
  onClick: PropTypes.func,
};

class AppContainer extends React.PureComponent {
  componentDidMount() {
    seenCanvas('seen-canvas');
  }
  render() {
    const { children, slides, onClickSlide } = this.props;

    return (
      <Container>
        <Header />

        <Columns>
          <Sidebar>
            <SidebarContent>
              <SlidesList slides={slides} onClick={onClickSlide} />
            </SidebarContent>
          </Sidebar>
          <Content>
            {Children.toArray(children)}
          </Content>
          <RightBar>
            <RightBarContent>
              <h1>
                Drag the sphere<br />below to rotate the<br />Science On a Sphere.
              </h1>
              <canvas id="seen-canvas" width="360" height="360" />
            </RightBarContent>
          </RightBar>
        </Columns>
      </Container>
    );
  }
}

AppContainer.propTypes = {
  children: PropTypes.any,
  slides: PropTypes.array,
  onClickSlide: PropTypes.func,
};

export default AppContainer;
export {
  SlideBlock,
};
