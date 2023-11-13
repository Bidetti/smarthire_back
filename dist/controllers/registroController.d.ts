import { Request, Response } from "express";
export declare const getRegistroById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllRegistros: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getRegistroByServico: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createRegistro: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const updateRegistro: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteRegistro: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
