require('dotenv').config();
console.log('Loaded environment variables from environment.js:', {
  username: process.env.APP_USERNAME,
  password: process.env.APP_PASSWORD
});

module.exports = () => {
  return {
    username: process.env.APP_USERNAME,
    password: process.env.APP_PASSWORD
  };
};


