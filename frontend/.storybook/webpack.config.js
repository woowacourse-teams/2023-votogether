const path = require('path');
const Dotenv = require('dotenv-webpack');

const envPath =
  process.env.NODE_ENV === 'development'
    ? path.join(__dirname, '../webpack/.env.development')
    : path.join(__dirname, '../webpack/.env.production');

module.exports = ({ config }) => {
  config.plugins.push(
    new Dotenv({
      path: envPath,
    })
  );

  return config;
};
