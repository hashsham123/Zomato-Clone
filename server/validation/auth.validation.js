import joi from "joi";

export const validateSignup = (userData)=>{
    // joi is used for validation to know more details refer to joi.dev
    const schema = joi.object({
      fullName:joi.string().required().min(5),
      email:joi.string().email().required(),
      password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      address:joi.array().items.apply(joi.object({details:joi.string(),for:joi.string()})),
       phoneNumber:joi.array().items(joi.number().min(10).max(10))
    });

    return Schema.validateAsync(userData);
};


export const validateSignin = (userData)=>{
    // joi is used for validation to know more details refer to joi.dev
    const schema = joi.object({
    
      email:joi.string().email().required(),
      password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
     
    });

    return Schema.validateAsync(userData);
};