import { Request, Response } from 'express';
export declare const getServicoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllServicos: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getServicoByUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getServicoByCategoria: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createServico: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const updateServico: (req: Request, res: Response) => Response<any, Record<string, any>>;
export declare const deleteServico: (req: Request, res: Response) => Response<any, Record<string, any>>;
