import { Request, Response, NextFunction } from 'express';
interface AuthenticatedRequest extends Request {
    user?: any;
}
export declare const authenticateUser: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
export {};