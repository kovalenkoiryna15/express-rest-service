import dotenv from 'dotenv';
import path from 'path';

import {
  PORT_INDEX,
  NODE_ENV_INDEX,
  AUTH_MODE_INDEX,
} from './constants';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});



const PORT = process.env?.[PORT_INDEX] || 4000;
const NODE_ENV = process.env?.[NODE_ENV_INDEX] || 'development';
const { MONGO_CONNECTION_STRING } = process.env;
const { JWT_SECRET_KEY } = process.env;
const AUTH_MODE = process.env?.[AUTH_MODE_INDEX]|| 'true';

const config = {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
  AUTH_MODE,
};

export default config;
