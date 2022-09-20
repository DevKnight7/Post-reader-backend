import * as Joi from 'joi';

export const appConfigSchema = Joi.object({
  PORT: Joi.number().default(8080).required(),
});
