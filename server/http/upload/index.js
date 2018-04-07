import express from 'express';
import formidable from 'formidable';
import Response from '../../response';
import image from './image';

const presets = {
  image,
};

const router = express.Router();

router
  .route('/upload')
  .post((req, res, next) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      const { preset } = fields;

      if (presets[preset] === undefined) {
        next(new Error('Unknown preset!'));
        return;
      }

      try {
        const data = await presets[preset](req)(fields, files);
        res.send(new Response(data));
      } catch (errOnSave) {
        res.send(new Response(errOnSave));
      }
    });
  });

export {
  router,
};
