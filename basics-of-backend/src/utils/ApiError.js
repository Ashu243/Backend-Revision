
module.exports = class ApiError extends Error {
    constructor(statusCode=500, message='Something went Wrong', error=[]){
        super(message)
        this.statusCode = statusCode
        this.error = error
    }
}
