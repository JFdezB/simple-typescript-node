//LOAD ENV VARS
import dotenv from 'dotenv';
dotenv.config();

// INIT HAPI AND DB
import { Server } from "@hapi/hapi";
import db from "./models";

import laabr from 'laabr';
import Boom from 'boom';
import Inert from '@hapi/inert';
import Joi from '@hapi/joi';
import Vision from '@hapi/vision';
const Pack = require('../package');
import HapiSwagger from 'hapi-swagger';

import logger from './config/logger';
const log = logger("app.ts")

class App {
  public server: Server;
  public port: number;
  public controllers: Array<any>;

  constructor(controllers, port) {


    this.port = port;
    this.controllers = controllers;
    this.server = new Server({
      port: this.port,
      host: 'localhost',
      routes: {
        cors: {
          origin: ["*"]
        },
        validate: {
          failAction: async (request, h, err) => {
            if (process.env.NODE_ENV === 'production') {
              // In prod, log a limited error message and throw the default Bad Request error.
              console.error('ValidationError:', err.message);
              throw Boom.badRequest(`Invalid request payload input`);
            } else {
              // During development, log and respond with the full error.
              console.error(err);
              throw err;
            }
          }
        }
      }
    });
  }

  public async init() {
    await this.initializeMiddlewares();
    this.initializeControllers(this.controllers);
  }

  private async initializeMiddlewares() {

    // this.app.use((req, res, next) => {
    //   req["transitionId"] = v4();
    //   next();
    // })
    this.server.validator(Joi)
    const swaggerOptions = {
      info: {
        title: 'API Documentation',
        version: Pack.version,
      },
    };
    await this.server.register([{
      plugin: laabr,
      options: {},
    },
      Inert,
      Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
    ]);
    // morgan.token('transition-id', function (req, res) { return req.transitionId })
    // this.app.use(morgan(':transition-id :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {
    //   stream: { write: function (str) { log.info(str); } }
    // }));

    // this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      controller.init(this.server)
    });
  }

  public listen() {
    db.init().then(async () => {

      this.server.start();
      log.info(`Server listening on ${this.server.info.uri}`);

    }).catch(err => {
      log.error(err);
      process.exit(1);
    })
  }
}

export default App;