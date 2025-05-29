require('dotenv').config();

module.exports = () => {
  return {
    username: process.env.APP_USERNAME,
    password: process.env.APP_PASSWORD
  };
};


