
import { Sequelize } from 'sequelize-typescript';

import logger from '../config/logger';
import { User } from './definitions';

const log = logger("models/index.ts")

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  logging: msg => log.debug(msg),
  benchmark: true,
  define: {
    paranoid: false,
    timestamps: true,
    freezeTableName: true,
    underscored: false,
  }
});

function init() {
  return new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(async () => {
        log.info('Connection has been established successfully.');
        resolve(sequelize.sync())
      })
      .catch(err => {
        log.error('Unable to connect to the database:', err);
        reject(err)
      });
  })
}

const db = {
  init,
  sequelize,
  Sequelize,
  models: {
    User,
  }
};

sequelize.addModels([User]);

export default db;