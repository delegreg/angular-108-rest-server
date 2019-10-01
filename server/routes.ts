import { Application } from 'express';
import examplesRouter from './api/controllers/examples/router';
import lotbRouter from './api/controllers/lotb/router';
export default function routes(app: Application): void {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/lotb', lotbRouter);
};