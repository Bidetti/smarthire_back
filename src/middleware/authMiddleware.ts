import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (process.env.JWT_SECRET) {
            jwt.verify(token, process.env.JWT_SECRET as Secret, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: 'Token inválido' });
                }
                req.user = decoded;
                next();
            });
        } else {
            res.status(500).json({ message: 'JWT_SECRET não definido' });
        }
    } else {
        res.status(401).json({ message: 'Token não fornecido' });
    }
};