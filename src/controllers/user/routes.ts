import * as Hapi from "@hapi/hapi";
import * as Joi from "@hapi/joi";
import UserController from "./user-controller";
import * as UserValidator from "./user-validator";

export default function (
  server: Hapi.Server,
) {
  const userController = new UserController();
  server.bind(userController);

  server.route({
    method: "GET",
    path: "/users/{id}",
    options: {
      handler: userController.getUserById,
      tags: ["api", "users"],
      description: "Get user by id.",
      validate: {
        params: {
          id: Joi.number().required()
        }
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "User founded."
            },
            "404": {
              description: "User does not exists."
            }
          }
        }
      }
    }
  })

  server.route({
    method: "GET",
    path: "/users",
    options: {
      handler: userController.getUsers,
      tags: ["api", "users"],
      description: "Get all users.",
      validate: {
        query: UserValidator.paginateUsers
      }
    }
  });

  server.route({
    method: "DELETE",
    path: "/users/{id}",
    options: {
      handler: userController.deleteUserById,
      tags: ["api", "users"],
      description: "Delete user by id.",
      validate: {
        params: {
          id: Joi.string().required()
        },
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Deleted User."
            },
            "404": {
              description: "User does not exists."
            }
          }
        }
      }
    }
  });

  server.route({
    method: "PUT",
    path: "/users/{id}",
    options: {
      handler: userController.updateUserById,
      tags: ["api", "users"],
      description: "Update user by id.",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: UserValidator.modelUsers,
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Deleted User."
            },
            "404": {
              description: "User does not exists."
            }
          }
        }
      }
    }
  });

  server.route({
    method: "POST",
    path: "/users",
    options: {
      handler: userController.createUser,
      tags: ["api", "users"],
      description: "Create a user.",
      validate: {
        payload: UserValidator.modelUsers,
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Created User."
            }
          }
        }
      }
    }
  });
}


