class ExpressError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.isOperational = true // To identify known Error

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ExpressError