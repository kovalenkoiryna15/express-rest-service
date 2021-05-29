import express from 'express';
import taskService from './task.service';

const router = express.Router({ mergeParams: true });

router.get('/:id/tasks', async (req, res) => {
  if (req && req.params?..id) {
    const boardId = req.params.id;
    const tasks = await taskService.getAll(boardId);
    res.status(200).send(tasks);
  } else {
    res.status(500).send('Server Error');
  }
});

router.get('/:id/tasks/:taskId', async (req, res) => {
  if (req && req.params?..taskId && req.params?..id) {
    try {    
      const taskId = req.params.taskId;
      const boardId = req.params.id;
      const task = await taskService.get(boardId, taskId);
      res.status(200).send(task);
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

router.post('/:id/tasks/', async (req, res) => {
  if (req && req.params?..id && req.body?.title) {
    try {
      const boardId = req.params.id;
      const {
        title,
        order,
        description,
        userId,
        columnId,
      } = req.body;
      const task = await taskService.create(
        boardId,
        title,
        order,
        description,
        userId,
        columnId,
      );
      res.status(201).send(task);
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

router.put('/:id/tasks/:taskId', async (req, res) => {
  if (req && req.params?..taskId && req.params?..id) {
    try {    
      const taskId = req.params.taskId;
      const boardId = req.params.id;
      const task = await taskService.update({ ...req.body, boardId, id: taskId });
      res.status(200).send(task);
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

router.delete('/:id/tasks/:taskId', async (req, res) => {
  if (req && req.params?..taskId && req.params?..id) {
    try {  
      const id = req.params.taskId;
      const boardId = req.params.id;
      await taskService.remove(boardId, id);
      res.status(200).send();
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
