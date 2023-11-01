import { Request, Response } from 'express';
import ServicoModel from '../models/servicoModel';
import logger from '../config/logger';

export const getServicoById = async (req: Request, res: Response) => {
    const { servicoID } = req.params;
    try {
        const servico = await ServicoModel.findOne({ servicoID });
        if (!servico) {
            logger.error(`Serviço ${servicoID} não encontrado`);
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        logger.info(`Serviço ${servicoID} encontrado com sucesso`);
        return res.status(200).json(servico);
    } catch (error) {
        logger.error('Erro ao buscar o serviço', error);
        return res.status(500).json({ message: 'Erro ao buscar o serviço' });
    }
};

export const getAllServicos = async (req: Request, res: Response) => {
    try {
        const servicos = await ServicoModel.find();
        logger.info('Serviços encontrados com sucesso');
        return res.status(200).json(servicos);
    } catch (error) {
        logger.error('Erro ao buscar os serviços', error);
        return res.status(500).json({ message: 'Erro ao buscar os serviços' });
    }
};

export const getServicoByUser = async (req: Request, res: Response) => {
    const { userID } = req.params;
    try {
        const servicos = await ServicoModel.find({ userID });
        if (!servicos) {
            logger.error(`Serviços do usuário ${userID} não encontrados`);
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        logger.info(`Serviços do usuário ${userID} encontrados com sucesso`);
        return res.status(200).json(servicos);
    } catch (error) {
        logger.error('Erro ao buscar o serviço', error);
        return res.status(500).json({ message: 'Erro ao buscar o serviço' });
    }
};
export const getServicoByCategoria = async (req: Request, res: Response) => {
    const { categoria } = req.params;
    try {
        const servicos = await ServicoModel.find({ categoria });
        if (!servicos) {
            logger.error(`Serviços da ${categoria} não encontrados`);
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        logger.info(`Serviços da ${categoria} encontrados com sucesso`);
        return res.status(200).json(servicos);
    } catch (error) {
        logger.error('Erro ao buscar o serviço', error);
        return res.status(500).json({ message: 'Erro ao buscar o serviço' });
    }
};

export const createServico = (req: Request, res: Response) => {
    try {
        const servico = new ServicoModel(req.body);
        servico.save();
        logger.info(`Serviço ${servico._id} criado com sucesso`);
        return res.status(201).json(servico);
    } catch (error) {
        logger.error('Erro ao criar o serviço', error);
        return res.status(500).json({ message: 'Erro ao criar o serviço' });
    }
};

export const updateServico = (req: Request, res: Response) => {
    try {
        const { servicoID } = req.params;
        const servico = new ServicoModel(req.body);
        ServicoModel.findOneAndUpdate({ servicoID }, servico);
        logger.info(`Serviço ${servicoID} atualizado com sucesso`);
        return res.status(200).json(servico);
    } catch (error) {
        logger.error('Erro ao atualizar o serviço', error);
        return res.status(500).json({ message: 'Erro ao atualizar o serviço' });
    }
};

export const deleteServico = (req: Request, res: Response) => {
    try {
        const { servicoID } = req.params;
        ServicoModel.findOneAndDelete({ servicoID });
        logger.info(`Serviço ${servicoID} removido com sucesso`);
        return res.status(200).json({ message: 'Serviço removido com sucesso' });
    } catch (error) {
        logger.error('Erro ao remover o serviço', error);
        return res.status(500).json({ message: 'Erro ao remover o serviço' });
    }
};



