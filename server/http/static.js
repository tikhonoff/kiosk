import express from 'express';
import Attachment from '../models/Attachment';

const router = express.Router();

router
  .get('/:id.:type', async (req, res, next) => {
    const { id, type } = req.params;

    try {
      const attachment = await Attachment.findOne({
        _id: id,
        type,
      });

      const streamPromise = new Promise(async (resolve, reject) => {
        const stream = await attachment.openDownloadStream();

        stream.pipe(res)
          .on('error', reject)
          .on('finish', resolve);
      });
      await streamPromise;
    } catch (err) {
      next(err);
    }
  });

export default router;
export {
  router,
};
