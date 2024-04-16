const joi = require('joi');
const passwordComplexity = require('joi-password-complexity')


const registerBodyValidation =(body)=>{
    const schema = joi.object({
        userName:joi.string().required().label("Name"),
        email:joi.string().required().label("Email"),
        phone:joi.string().required().label("phone"),
        password:passwordComplexity().required().label('password'),
        cpassword:passwordComplexity().required().label('confirm password'),
    });
    return schema.validate(body);

}

const loginBodyvalidation= (body)=>{
    const schema =joi.object({
        email:joi.string().required().label("Email"),
        password:passwordComplexity().required().label('Password'),
    })
    return schema.validate(body);
};

const refreshTokenBodyValidation =(body)=>{
    const schema = joi.object({
        refreshToken:joi.string().required().label('Refresh Token'),
    });
    return schema.validate(body)
};

module.exports={ 
    registerBodyValidation,
    loginBodyvalidation,
    refreshTokenBodyValidation
}

