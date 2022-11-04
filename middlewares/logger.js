const {createLogger, transports, format} = require('winston')

const logsFolder = `./logs/`
const loggerTransports = [
    new transports.File({
        level: 'info',
        filename: `${logsFolder}logs.log`
    })
    
]
const loggerRequestTransports = [
    new transports.File({
        level: 'warn',
        filename: `${logsFolder}requestWaring.log`
    }),
    new transports.File({
        level: 'error',
        filename: `${logsFolder}requestError.log`
    })
]

if(process.env.NODE_ENV !== 'production'){
    loggerTransports.push(
        new transports.Console()
    )
    loggerRequestTransports.push(
        new transports.File({
            level: 'info',
            filename: `${logsFolder}requestInfo.log`
        })

    )
}

const logger = createLogger({
    transports: loggerTransports,
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint(),
        
    ),
    expireAt: new Date()
})

const requestLogger = createLogger({
    transports: loggerRequestTransports,
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint()
    )

})

module.exports = {
    logger,
    requestLogger
}