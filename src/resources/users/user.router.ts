import express from 'express';
import User from './user.model';
import usersService from './user.service';

const router = express.Router();

router.get('/', async (_, res: express.Response) => {
  const users = await usersService.getAll();
  res.status(200).send(users.map(User.toResponse));
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
  const ID = 'id';
  if (req && req.params?.[ID]) {
    try {
      const id = req.params[ID];
      if (id) {
        const user = await usersService.get(id);
        if (user) {
          res.status(200).send(User.toResponse(user));
        } else {
          res.status(500).send('Server Error');
        }
      } else {
        res.status(500).send('Server Error');
      }
    } catch (err) {
      if (err.status) {
        res.status(err.status).send(err.message);
      } else {
        res.status(500).send('Server Error');
      }
    }
  } else {
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const { name, login, password } = req.body;
    const user = await usersService.create(name, login, password);
    res.status(201).send(User.toResponse(user));
  } catch (err) {
    if (err.status) {
      res.status(err.status).send(err.message);
    } else {
      res.status(500).send('Server Error');
    }
  }
});

router.put('/:id', async (req: express.Request, res: express.Response) => {
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
        res.status(500).send('Server Error');
      }
    } catch (err) {
      if (err.status) {
        res.status(err.status).send(err.message);
      } else {
        res.status(500).send('Server Error');
      }
    }
  } else {
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req: express.Request, res: express.Response) => {
  const ID = 'id';
  if (req && req.params?.[ID]) {
    try {
      const id = req.params[ID];
      if (id) {
        await usersService.remove(id);
        res.status(204).send();
      } else {
        res.status(500).send('Server Error');
      }
    } catch (err) {
      if (err.status) {
        res.status(err.status).send(err.message);
      } else {
        res.status(500).send('Server Error');
      }
    }
  } else {
    res.status(500).send('Server Error');
  }
});

export default router;
