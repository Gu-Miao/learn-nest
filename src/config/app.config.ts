export default () => ({
  enviroment: process.env.NODE_ENV || 'developement',
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: +process.env.DATABASE_PORT || 5432,
  },
});
