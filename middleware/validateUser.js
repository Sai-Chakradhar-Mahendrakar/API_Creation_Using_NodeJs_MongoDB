const Joi = require('@hapi/joi')

// Define a validation Schema
const userScheme = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    dob: Joi.date()
})

// middleware for validation
const validateUser = (req, res, next) =>{
    const {error} = userScheme.validate(req.body, {abortEarly : false});
    if(error){
        console.log(error)
        const errors = error.details.map((detail) => detail.message)
        return res.status(400).json({errors})
    }
    next();
};

module.exports = validateUser