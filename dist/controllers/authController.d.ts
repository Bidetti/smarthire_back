import { Request, Response } from "express";
export declare const conectarUsuario: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const recoverCode: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifyCode: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const resetPassword: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifyJWT: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
