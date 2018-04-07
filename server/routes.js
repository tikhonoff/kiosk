import { forEach } from 'lodash';
import httpRouters from './http';
import httpStaticRouter from './http/static';

const setupApi = (app) => {
  forEach(httpRouters, (httpRouter) =>
    app.use('/api', httpRouter));
};

const setupStatic = (app) => {
  app.use('/static', httpStaticRouter);
};

export default (app) => {
  setupApi(app);
  setupStatic(app);
};
