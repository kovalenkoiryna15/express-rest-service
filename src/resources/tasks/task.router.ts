import express from 'express';
import taskService from './task.service';

const router = express.Router({ mergeParams: true });

router.get('/:id/tasks', async (req, res, next: express.NextFunction) => {
  if (req && req.params?.id) {
    const { id: boardId } = req.params;
    const tasks = await taskService.getAll(boardId);
    res.status(200).send(tasks);
  } else {
    next(new Error());
  }
});

router.get('/:id/tasks/:taskId', async (req, res, next: express.NextFunction) => {
  if (req && req.params?.taskId && req.params?.id) {
    try {
      const { taskId, id: boardId } = req.params;
      const task = await taskService.get(boardId, taskId);
      res.status(200).send(task);
    } catch (err) {
      next(err);
    }
  } else {
    next(new Error());
  }
});

router.post('/:id/tasks/', async (req, res, next: express.NextFunction) => {
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
      next(err);
    }
  } else {
    next(new Error());
  }
});

router.put('/:id/tasks/:taskId', async (req, res, next: express.NextFunction) => {
  if (req && req.params?.taskId && req.params?.id) {
    try {
      const { taskId, id: boardId } = req.params;
      const task = await taskService.update({ ...req.body, boardId, id: taskId });
      res.status(200).send(task);
    } catch (err) {
      next(err);
    }
  } else {
    next(new Error());
  }
});

router.delete('/:id/tasks/:taskId', async (req, res, next: express.NextFunction) => {
  if (req && req.params?.taskId && req.params?.id) {
    try {  
      const { taskId: id, id: boardId } = req.params;
      await taskService.remove(boardId, id);
      res.status(200).send();
    } catch (err) {
      next(err);
    }
  } else {
    next(new Error());
  }
});

export default router;
