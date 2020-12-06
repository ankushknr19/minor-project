import joi from 'joi'

const userRegisterValidateSchema = joi.object({
   name: joi.string().min(3).required(),
   email: joi.string().min(4).email().required(),
   password: joi.string().min(6).required(),
});

const userLoginValidateSchema = joi.object({
   email: joi.string().min(4).email().required(),
   password: joi.string().required(),
});


export { userRegisterValidateSchema, userLoginValidateSchema, userUpdateValidateSchema }