const Tasks = require('../models/tasks.model');

const getAllTasks = async (req, res) => {
  try {
    const { _id } = req.user;
    const tasks = await Tasks.find({ owner: _id });
    return { tasks };
  } catch (error) {
    throw new Error(error.message);
  }
};

const renderHomePage = async (req, res) => {
  let tasks = await getAllTasks(req);
  const { user } = req;
  res.render('index.hbs', { tasks, user });
};

module.exports = {
  renderHomePage,
};
