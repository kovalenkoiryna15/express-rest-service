import express from 'express';
import boardService from './board.service';

const router = express.Router();

router.get('/', async (_req, res) => {
  const boards = await boardService.getAll();
  res.status(200).send(boards);
});

router.get('/:id', async (req, res) => {
  if (req && req.params?..id) {
    try {    
      const id = req.params.id;
      const board = await boardService.get(id);
      res.status(200).send(board);
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

router.post('/', async (req, res) => {
  if (req && req.body) {
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
  } else {
    res.status(500).send('Server Error');
  }
});

router.put('/:id', async (req, res) => {
  if (req && req.params?..id && req.body) {
    try {
      const id = req.params.id;
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
  } else {
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  if (req && req.params?..id) {
    try {
      const id = req.params.id;
      await boardService.remove(id);
      res.status(204).send();
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
