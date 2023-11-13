import { Request, Response } from "express";
export declare const getAvaliacaoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllAvaliacoes: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAvaliacaoByUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createAvaliacao: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const updateAvaliacao: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteAvaliacao: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
