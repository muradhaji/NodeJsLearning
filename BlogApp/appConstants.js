const APP_PORT = 3000;
const DB_USER_NAME = 'muradhajiyev42';
const DB_USER_PASS = 'user4242';
const DB_CLUSTER_NAME = 'node-learning';
const URI = `mongodb+srv://${DB_USER_NAME}:${DB_USER_PASS}@nodelearning.rnzl70f.mongodb.net/${DB_CLUSTER_NAME}?retryWrites=true&w=majority`;

const JWT_SECRET = 'MURAD HAJIYEV';
const JWT_AGE = 1 * 24 * 60 * 60;
const JWT_AGE_MS = JWT_AGE * 1000;

const DUBLICATE_FIELD_MESSAGES = {
  email: 'The email address you entered has already been used!',
};

module.exports = {
  APP_PORT,
  DB_USER_NAME,
  DB_USER_PASS,
  DB_CLUSTER_NAME,
  URI,

  JWT_SECRET,
  JWT_AGE,
  JWT_AGE_MS,

  DUBLICATE_FIELD_MESSAGES,
};
