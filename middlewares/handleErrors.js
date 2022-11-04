import { GeneralError } from "../utils/errors"

export const handleErrors = async (err, req, res, next) => {
    let code = 500
    if(err instanceof GeneralError){
         code = err.getCode()
        // return res.status(code).json({name: err.name, message: err.message})
    }
    // we don't know any known error if we come into this point
    let correlationId = req.headers['x-correlation-id']
    return res.status(code).json({
        correlationId: correlationId,
        // name: "internal Server Error",
        message: err.message
    })
}