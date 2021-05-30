import express from 'express';
import taskService from './task.service';

const router = express.Router({ mergeParams: true });

router.get('/:id/tasks', async (req, res) => {
  if (req && req.params?.id) {
    const { id: boardId } = req.params;
    const tasks = await taskService.getAll(boardId);
    res.status(200).send(tasks);
  } else {
    res.status(500).send('Server Error');
  }
});

router.get('/:id/tasks/:taskId', async (req, res) => {
  if (req && req.params?.taskId && req.params?.id) {
    try {
      const { taskId, id: boardId } = req.params;
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
  if (req && req.params?.id && req.body?.title) {
    try {
      const { id: boardId } = req.params;
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
  if (req && req.params?.taskId && req.params?.id) {
    try {
      const { taskId, id: boardId } = req.params;
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
  if (req && req.params?.taskId && req.params?.id) {
    try {  
      const { taskId: id, id: boardId } = req.params;
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
