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

const renderAccountPage = (req, res) => {
  const { user } = req;
  res.render('account.hbs', { user });
};

module.exports = {
  renderHomePage,
  renderAccountPage,
};
