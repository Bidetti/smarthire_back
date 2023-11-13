import { Request, Response } from 'express';
export declare const getPropostaById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllPropostas: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPropostaByUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createProposta: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const updateProposta: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteProposta: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
