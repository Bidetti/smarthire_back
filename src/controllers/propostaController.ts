import { Request, Response } from 'express';
import PropostaModel from '../models/propostaModel';
import logger from '../config/logger';


export const getPropostaById = async (req: Request, res: Response) => {
    const { propostaID } = req.params;
    try {
        const proposta = await PropostaModel.findOne({ propostaID });
        if (!proposta) {
            return res.status(404).json({ message: 'Proposta não encontrada' });
        }
        return res.status(200).json(proposta);
    } catch (error) {
        logger.error('Erro ao buscar a proposta', error);
        return res.status(500).json({ message: 'Erro ao buscar a proposta' });
    }
};

export const getAllPropostas = async (req: Request, res: Response) => {
    try {
        const propostas = await PropostaModel.find();
        return res.status(200).json(propostas);
    } catch (error) {
        logger.error('Erro ao buscar as propostas', error);
        return res.status(500).json({ message: 'Erro ao buscar as propostas' });
    }
};

export const getPropostaByUser = async (req: Request, res: Response) => {
    const { userID } = req.params;
    try {
        const propostas = await PropostaModel.find({ userID });
        if (!propostas) {
            return res.status(404).json({ message: 'Proposta não encontrada' });
        }
        return res.status(200).json(propostas);
    } catch (error) {
        logger.error('Erro ao buscar a proposta', error);
        return res.status(500).json({ message: 'Erro ao buscar a proposta' });
    }
};

export const createProposta = (req: Request, res: Response) => {
    try {
        const proposta = new PropostaModel(req.body);
        proposta.save();
        return res.status(201).json(proposta);
    } catch (error) {
        logger.error('Erro ao criar a proposta', error);
        return res.status(500).json({ message: 'Erro ao criar a proposta' });
    }
};

export const updateProposta = async (req: Request, res: Response) => {
    try {
        const { propostaID } = req.params;
        const proposta = new PropostaModel(req.body);
        await PropostaModel.findOneAndUpdate({ propostaID }, proposta);
        return res.status(200).json(proposta);
    } catch (error) {
        logger.error('Erro ao atualizar a proposta', error);
        return res.status(500).json({ message: 'Erro ao atualizar a proposta' });
    }
};

export const deleteProposta = async (req: Request, res: Response) => {
    try {
        const { propostaID } = req.params;
        await PropostaModel.findOneAndDelete({ propostaID });
        return res.status(200).json({ message: 'Proposta removida com sucesso' });
    } catch (error) {
        logger.error('Erro ao remover a proposta', error);
        return res.status(500).json({ message: 'Erro ao remover a proposta' });
    }
};