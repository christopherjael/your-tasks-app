const { connect } = require('mongoose');

module.exports = dbConnection = async () => {
  try {
    console.log(process.env.MONGOBD_URI);
    await connect(process.env.MONGOBD_URI);

    console.log('🗄️  Database Conneted');
  } catch (error) {
    throw new Error('Error to try connect to databases', error.message);
  }
};
