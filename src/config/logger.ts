import winston from 'winston';
import moment from 'moment';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: `./logs/error/${moment().format('DD-MM-YYYY')}.log`, level: 'error' }),
    ],
});

if (process.env.NODE_ENV !== 'development') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

export default logger;