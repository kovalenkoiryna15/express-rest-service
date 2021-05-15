const router = require('express').Router();
const taskService = require('./task.service');

router.get('/', async (req, res) => {
  const tasks = await taskService.getAll();
  res.status(200).send(tasks);
});

module.exports = router;
