'use strict';

/* Environment Objects */
var config = {
  production: {
    port: Number(process.env.PORT || 8080),
    host: process.env.IP || '127.0.0.1',
    database: 'mongodb://admin:admin@ds061355.mongolab.com:61355/quickee-db',
    env: 'prod',
    secret: 'rRID4RK7'
  },
  development: {
    port: Number(process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080),
    host: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1',
    database: 'mongodb://admin:admin@ds061355.mongolab.com:61355/quickee-db',
    env: 'dev'
  },
  local: {
    port: Number(process.env.PORT || 8080),
    host: process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1',
    database: 'mongodb://localhost:27017/hackathon2-db',
    env: 'local'
  }
};

module.exports = function () {
  switch(process.env.NODE_ENV) {
  case 'production': return config.production;    // production environment
  case 'development': return config.development;  // development environment
  case 'test': return config.test;                // test environment
  case 'local': return config.local;              // local environment (just in case)
  default: return config.development;             // node server will start en development mode by default
  }
};
