const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');

router.get('/', async (req, res) => {
  const tasks = await taskService.getAll(req.params.id);
  res.status(200).send(tasks);
});

router.get('/:taskId', async (req, res) => {
  try {
    const task = await taskService.get(req.params.id, req.params.taskId);
    res.status(200).send(task);
  } catch (err) {
    if (err.status) {
      res.status(err.status).send(err.message);
    } else {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
});

module.exports = router;
