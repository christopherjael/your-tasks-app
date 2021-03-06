const { connect } = require('mongoose');

module.exports = dbConnection = async () => {
  try {
    await connect(process.env.MONGODB_URI);

    console.log('🗄️  Database Conneted');
  } catch (error) {
    throw new Error('Error to try connect to databases', error.message);
  }
};
