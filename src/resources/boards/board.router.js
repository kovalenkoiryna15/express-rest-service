const router = require('express').Router();
const boardService = require('./board.service');

router.get('/', async (req, res) => {
  const boards = await boardService.getAll();
  res.status(200).send(boards);
});

router.get('/:id', async (req, res) => {
  try {
    const board = await boardService.get(req.params.id);
    res.status(200).send(board);
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
    const { title, columns } = req.body;
    const board = await boardService.create(title, columns);
    res.status(201).send(board);
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
    const { title, columns } = req.body;
    const board = await boardService.update(id, title, columns);
    res.status(200).send(board);
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
    await boardService.remove(id);
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
