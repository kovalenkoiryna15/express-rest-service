import express from 'express';
import boardService from './board.service';

const router = express.Router();

router.get('/', async (_req, res) => {
  const boards = await boardService.getAll();
  res.status(200).send(boards);
});

router.get('/:id', async (req, res, next: express.NextFunction) => {
  const ID = 'id';
  if (req && req.params?.[ID]) {
    try {    
      const { id } = req.params;
      const board = await boardService.get(id);
      res.status(200).send(board);
    } catch (err) {
      next(err);
    }
  } else {
    next(new Error());
  }
});

router.post('/', async (req, res, next: express.NextFunction) => {
  if (req && req.body) {
    try {    
      const { title, columns } = req.body;
      const board = await boardService.create(title, columns);
      res.status(201).send(board);
    } catch (err) {
      next(err);
    }
  } else {
    next(new Error());
  }
});

router.put('/:id', async (req, res, next: express.NextFunction) => {
  const ID = 'id';
  if (req && req.params?.[ID] && req.body) {
    try {
      const { id } = req.params;
      const { title, columns } = req.body;
      const board = await boardService.update(id, title, columns);
      res.status(200).send(board);
    } catch (err) {
      next(err);
    }
  } else {
    next(new Error());
  }
});

router.delete('/:id', async (req, res, next: express.NextFunction) => {
  const ID = 'id';
  if (req && req.params?.[ID]) {
    try {
      const { id } = req.params;
      await boardService.remove(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  } else {
    next(new Error());
  }
});

export default router;
