import LotbService from '../../services/lotb.services';
import { Request, Response } from 'express';

export class Controller {
  all(req: Request, res: Response): void {
    LotbService.all().then(r => res.json(r));
  }

  byId(req: Request, res: Response): void {
    const id = req.params['id']
    LotbService.byId(id).then(r => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    LotbService.create(req.body.name).then(r =>
      res
        .status(201)
        .location(`/api/v1/toons/${r.id}`)
        .json(r),
    );
  }

  delete(req: Request, res: Response): void {
    const id = req.params['id']
    LotbService.delete(id).then(r => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  update(req: Request, res: Response): void {
    const id = req.params['id']
    const name = req.body.name
    LotbService.update(id,name).then(r => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }
}
export default new Controller();
