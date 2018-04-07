/* eslint-disable prefer-arrow-callback, func-names */

import mongoose, { Schema } from 'mongoose';
import { createReadStream } from 'fs';
import { URL } from 'url';
import { Bucket } from '../database';
import config from '../config';

const schema = new Schema({
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  name: { type: String },
  type: { type: String },
  mimeType: { type: String },
  binary: { type: Buffer },
  fs: { type: Schema.Types.ObjectId, ref: 'fs.files' },
}, {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

schema.virtual('url')
  .get(function () {
    const key = '_id';
    return new URL(`/static/${this[key]}.${this.type}`, config.baseURL);
  });

schema.statics.uploadByPath = async function uploadByPath({
  path,
  type,
  mimeType,
  name,
}) {
  return new Promise(async (resolve, reject) => {
    await Bucket.whenConnected();
    createReadStream(path)
      .pipe(
        Bucket.getBucket().openUploadStream(name)
      )
      .on('error', reject)
      .on('finish', async (fsFile) => {
        const key = '_id';
        try {
          const attachment = new Attachment({
            name,
            type,
            mimeType,
            fs: fsFile[key],
          });

          await attachment.save();
          resolve(attachment);
        } catch (err) {
          reject(err);
        }
      });
  });
};

schema.methods.openDownloadStream = async function () {
  await Bucket.whenConnected();
  return Bucket.getBucket().openDownloadStream(this.fs);
};

const Attachment = mongoose.model('Attachment', schema);
export default Attachment;
