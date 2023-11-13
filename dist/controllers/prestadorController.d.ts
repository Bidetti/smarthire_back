import { Request, Response } from 'express';
export declare const getPrestadorById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPrestadoresByCategoria: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllPrestadores: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createPrestador: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const updatePrestador: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const deletePrestador: (req: Request, res: Response) => Response<any, Record<string, any>>;
