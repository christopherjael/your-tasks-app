const Tasks = require('../models/tasks');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    return { tasks };
  } catch (error) {
    res.status(500).json({ error: error.message });
    throw new Error(error.message);
  }
};

const renderHomePage = async (req, res) => {
  let tasks = await getAllTasks();
  res.render('index.hbs', tasks);
};

module.exports = {
  renderHomePage,
};
