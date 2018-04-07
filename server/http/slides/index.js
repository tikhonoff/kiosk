import express from 'express';

import list from './list';
import create from './create';

const router = express.Router();

router
  .route('/slides')
  .get(list)
  .post(create);

export default {
  list,
  create,
};

export {
  router,
};
