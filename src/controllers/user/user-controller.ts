import * as Hapi from "@hapi/hapi";
import Boom from "boom";
import db from "../../models";
import { Op } from 'sequelize';

export default class UserController {

  constructor() {
  }


  public async getUserById(request: Hapi.Request, h: Hapi.ResponseToolkit) {

    const id = request.params["id"];

    const user = await db.models.User.findOne({ where: { id }, raw: true });

    if (user) {
      return user;
    } else {
      return Boom.notFound();
    }
  }

  public async getUsers(request: Hapi.Request, h: Hapi.ResponseToolkit) {


    const filter = request.query["filter"];
    const page = Number(request.query["page"]);
    const order = UserController.checkOrderParams(request.query["order"]);
    const size = Number(request.query["size"]);
    const offset = (page - 1) * size;

    const filterProcessName = filter ? {
      fullName: {
        [Op.iLike]: `${filter}%`
      }
    } : null;

    const users = await db.models.User.findAndCountAll({
      where: {
        ...filterProcessName
      },
      offset,
      limit: size,
      order: order ? [[order.param, order.order]] : null,
      raw: true
    })

    return {
      page,
      size,
      numPages: Math.ceil(users.count / size),
      totalCount: users.count,
      users: users.rows
    }
  }

  private static checkOrderParams(order) {
    return order === "firstName,asc" ? { param: "firstName", order: "asc" }
      : order === "firstName,desc" ? { param: "firstName", order: "desc" }
        : order === "lastName,asc" ? { param: "lastName", order: "asc" }
          : order === "lastName,desc" ? { param: "lastName", order: "desc" }
            : order === "createdAt,asc" ? { param: "createdAt", order: "asc" }
              : order === "createdAt,desc" ? { param: "createdAt", order: "desc" }
                : null
  }

  public async deleteUserById(request: Hapi.Request, h: Hapi.ResponseToolkit) {

    const id = request.params["id"];

    const user = await db.models.User.findOne({ where: { id } });

    if (user) {
      await user.destroy();
      return user;
    } else {
      return Boom.notFound();
    }
  }

  public async updateUserById(request: Hapi.Request, h: Hapi.ResponseToolkit) {

    const id = request.params["id"];
    const firstName = request.payload["firstName"];
    const lastName = request.payload["lastName"];
    const email = request.payload["email"];

    const user = await db.models.User.update({
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email
    }, { where: { id } });

    if (user) {
      return user;
    } else {
      return Boom.notFound();
    }
  }

  public async createUser(request: Hapi.Request, h: Hapi.ResponseToolkit) {

    const firstName = request.payload["firstName"];
    const lastName = request.payload["lastName"];
    const email = request.payload["email"];

    const user = await db.models.User.create({
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email
    });

    if (user) {
      return user;
    } else {
      return Boom.notFound();
    }
  }

}


