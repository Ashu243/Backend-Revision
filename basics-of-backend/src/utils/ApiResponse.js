

module.exports = class ApiResponse{
    constructor(statusCode, message, data, accessToken){
        this.statusCode = statusCode,
        this.message = message,
        this.data = data
        this.accessToken = accessToken
        this.success = this.statusCode<400
    }
}