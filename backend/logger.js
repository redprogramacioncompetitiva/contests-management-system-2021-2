const {createLogger, transports, format} = require('winston');

const customFormat = format.combine(format.timestamp(), format.printf((info) => {
    return `${info.timestamp} - [${info.level.toUpperCase()}] - ${info.message}`
}))

const logger = createLogger({
    format: customFormat,
    level:"info",
    transports: [
        new transports.Console({level: 'info'}),
        new transports.File({ filename: 'app.txt', level: 'info'})        
    ]
});

module.exports = logger;