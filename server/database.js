import mongoose from 'mongoose';
import { get } from 'lodash';

import config from './config';
import logger from './logger';

export default () => {
  try {
    mongoose.Promise = Promise;
    mongoose.connect(get(config, 'database.address'), (err, client) => {
      if (err) {
        throw err;
      }

      Bucket.updateRelations({
        db: client.db,
        bucket: new mongoose.mongo.GridFSBucket(client.db),
      });
    });
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

function BucketGenerate() {
  this.db = undefined;
  this.bucket = undefined;

  this.updateRelations = ({ db, bucket }) => {
    this.db = db;
    this.bucket = bucket;
    return this;
  };

  this.getBucket = () => {
    if (!this.isConnected()) {
      throw new Error('Mongoose is not connected');
    }

    return this.bucket;
  };

  this.isConnected = () => mongoose.connection.readyState === 1;

  this.whenConnected = () => {
    if (this.isConnected()) {
      return Promise.resolve(true);
    }

    const maxIter = 10;
    let curIter = 1;

    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (this.isConnected() || curIter > maxIter) {
          clearInterval(interval);
        }

        if (this.isConnected()) {
          resolve(true);
          return;
        }

        if (curIter > maxIter) {
          reject(new Error('Mongoose is not connected'));
          return;
        }

        curIter += 1;
      }, 1000);
    });
  };

  return this;
}

export const Bucket = new BucketGenerate();
