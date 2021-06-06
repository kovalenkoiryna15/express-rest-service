import express from 'express';
import User from './user.model';
import usersService from './user.service';

const router = express.Router();

router.get('/', async (_, res: express.Response) => {
  const users = await usersService.getAll();
  res.status(200).send(users.map(User.toResponse));
});

router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const ID = 'id';
  if (req && req.params?.[ID]) {
    try {
      const id = req.params[ID];
      if (id) {
        const user = await usersService.get(id);
        if (user) {
          res.status(200).send(User.toResponse(user));
        } else {
          throw new Error();
        }
      } else {
        throw new Error();
      }
    } catch (err) {
      next(err);
    }
  } else {
    next(new Error());
  }
});

router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { name, login, password } = req.body;
    const user = await usersService.create(name, login, password);
    res.status(201).send(User.toResponse(user));
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const ID = 'id';
  if (req && req.params?.[ID]) {
    try {
      const id = req.params[ID];
      const { name, login, password } = req.body;
      if (id) {
        const user = await usersService.update({
          id, name, login, password,
        });
        res.status(200).send(User.toResponse(user));
      } else {
        throw new Error();
      }
    } catch (err) {
      next(err);
    }
  } else {
    next(new Error());
  }
});

router.delete('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const ID = 'id';
  if (req && req.params?.[ID]) {
    try {
      const id = req.params[ID];
      if (id) {
        await usersService.remove(id);
        res.status(204).send();
      } else {
        throw new Error();
      }
    } catch (err) {
      next(err);
    }
  } else {
    next(new Error());
  }
});

export default router;
