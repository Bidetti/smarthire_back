"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (process.env.JWT_SECRET) {
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Token inválido' });
                }
                req.user = decoded;
                next();
            });
        }
        else {
            res.status(500).json({ message: 'JWT_SECRET não definido' });
        }
    }
    else {
        res.status(401).json({ message: 'Token não fornecido' });
    }
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=securityMiddleware.js.map