/* eslint-disable no-useless-return */
import path from 'path';
import config from '../../config';
import Attachment from '../../models/Attachment';

const { upload } = config;
const { maxImageSize, imageTypes, imageMimeTypes } = upload;

function assertIfInvalidPayload(file) {
  if (file && file.path
    && file.size && file.type && file.name) {
    return;
  }

  throw new Error('Wrong Payload.');
}

function assertIfInvalidType(file) {
  const ext = path.extname(file.name).toLowerCase()
    .replace(/^\.(.+)$/, '$1');

  if (imageTypes.indexOf(ext) !== -1) {
    return;
  }

  throw new Error('Wrong File Type.');
}

function assertIfInvalidMimeType(file) {
  if (imageMimeTypes.indexOf(file.type) !== -1) {
    return;
  }

  throw new Error('Wrong File Mime Type.');
}

function assertIfTooLongSize(file) {
  if (file.size <= maxImageSize) {
    return;
  }

  throw new Error('Too Large');
}

export default () =>
async (fields, files) => {
  const file = files.file;

  assertIfInvalidPayload(file);
  assertIfInvalidType(file);
  assertIfInvalidMimeType(file);
  assertIfTooLongSize(file);

  // start uploading image
  const attachment = await Attachment.uploadByPath({
    path: file.path,
    name: file.name,
    type: path.extname(file.name).toLowerCase().replace(/^\.(.+)$/, '$1'),
    mimeType: file.type.toLowerCase(),
  });

  return attachment;
};
