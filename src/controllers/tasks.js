const Tasks = require('../models/tasks');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
    throw new Error(error.message);
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const payload = { title, description };

    const task = Tasks(payload);

    await task.save();

    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: error.message });
    throw new Error(error.message);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Tasks.findByIdAndDelete(id);
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: error.message });
    throw new Error(error.message);
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const payload = { title, description };

    await Tasks.findByIdAndUpdate(id, payload);
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: error.message });
    throw new Error(error.message);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
};
