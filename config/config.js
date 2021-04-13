const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  // The secret key to be used to sign JWT.
  jwtSecret: process.env.JWT_SECRET || 'S3cr3tk3y',
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://' +
      (process.env.IP || 'localhost') +
      ':' +
      (process.env.MONGO_PORT || '27017') +
      '/mernproject',
};
export default config;
