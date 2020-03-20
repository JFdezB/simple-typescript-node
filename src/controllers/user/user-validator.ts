import * as Joi from "@hapi/joi";

export const paginateUsers = Joi.object().keys({
  filter: Joi.string().default(null),
  order: Joi.string().default(null),
  page: Joi.number().min(1).default(1),
  size: Joi.number().min(10).max(100).default(10)
})

export const modelUsers = Joi.object().keys({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
})