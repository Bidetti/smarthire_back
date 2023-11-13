"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const moment_1 = __importDefault(require("moment"));
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.default.transports.File({ filename: `./logs/error/${(0, moment_1.default)().format('DD-MM-YYYY')}.log`, level: 'error' }),
        new winston_1.default.transports.File({ filename: `./logs/combined/${(0, moment_1.default)().format('DD-MM-YYYY')}.log`
        }),
    ],
});
if (process.env.NODE_ENV !== 'development') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple(),
    }));
}
exports.default = logger;
//# sourceMappingURL=logger.js.map