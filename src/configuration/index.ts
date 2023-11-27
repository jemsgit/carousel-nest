// use it like a service to be able use .env file and inject it in module imports

export default () => ({
  mongoConnectionString: process.env.DB_CONNECTION_STRING,
});
