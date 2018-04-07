/**
*
* ImageIcon
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = styled.img`
  width: 50px;
  height: 50px;
`;

function ImageIcon({ src }) {
  return (
    <Image
      src={src}
    />
  );
}

ImageIcon.propTypes = {
  src: PropTypes.string.isRequired,
};

export default ImageIcon;
