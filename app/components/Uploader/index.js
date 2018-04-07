/**
*
* Uploader
*
*/

import React from 'react';
import { Uploader as UploaderAction, UploadField } from '@navjobs/upload';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import config from '../../config';

export const Wrapper = styled.div``;
export const Container = styled.div`
  background: #fff;
  border: 2px dashed #ddd;
  padding: 10px;
  text-align: center;
  transition: all .1s linear;
  &:hover {
    border-color: #777;
    cursor: pointer;
  }
`;
export const DropZoneArea = styled.div``;

function Uploader({ preset, uploadOnSelection, onComplete, fields }) {
  return (
    <Wrapper>
      <UploaderAction
        request={{
          fileName: 'file',
          url: [config.baseURL, config.apiEntry, config.api.upload].join('/'),
          method: 'POST',
          fields: {
            preset,
            ...fields,
          },
        }}
        onComplete={onComplete}
        uploadOnSelection={uploadOnSelection}
      >
        {({ onFiles, progress, complete }) => (
          <Container>
            <UploadField onFiles={onFiles}>
              <DropZoneArea>
                <FormattedMessage {...messages.header} />
              </DropZoneArea>
            </UploadField>

            {progress ? `Progress: ${progress} ` : null}
            {complete ? 'Complete!' : null}
          </Container>
        )}
      </UploaderAction>
    </Wrapper>
  );
}

Uploader.propTypes = {
  preset: PropTypes.string,
  uploadOnSelection: PropTypes.bool,
  onComplete: PropTypes.func,
  fields: PropTypes.object,
};

Uploader.defaultProps = {
  preset: 'image',
  uploadOnSelection: true,
  fields: {},
};

export default Uploader;
