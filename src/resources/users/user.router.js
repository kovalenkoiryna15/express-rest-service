const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.get('/', async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).send(users.map(User.toResponse));
});

router.get('/:id', async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    res.status(200).send(User.toResponse(user));
  } catch (err) {
    if (err.status) {
      res.status(err.status).send(err.message);
    } else {
      res.status(500).send('Server Error');
    }
  }
});

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, login, password } = req.body;
    const user = await usersService.update(id, name, login, password);
    res.status(200).send(User.toResponse(user));
  } catch (err) {
    if (err.status) {
      res.status(err.status).send(err.message);
    } else {
      res.status(500).send('Server Error');
    }
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await usersService.remove(id);
    res.status(204).send();
  } catch (err) {
    if (err.status) {
      res.status(err.status).send(err.message);
    } else {
      res.status(500).send('Server Error');
    }
  }
});

module.exports = router;
