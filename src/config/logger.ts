// import log4js from 'log4js';
import { configure, getLogger } from 'log4js';

export default function logger(filename, loglvl = 'debug') {
  let logger = getLogger(filename);
  logger.level = process.env.LOG_LEVEL || loglvl;
  return logger;
};