const mongoose = require('mongoose');

const databaseConnection = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB connection has been established successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

  mongoose.connection.on('error', err => {
    console.error('MongoDB error has occurred:', err);
  });
};

module.exports = databaseConnection;