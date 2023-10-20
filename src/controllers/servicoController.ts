import { Request, Response } from 'express';
import ServicoModel from '../models/servicoModel';

export const getServicoById = async (req: Request, res: Response) => {
    const { servicoID } = req.params;
    try {
        const servico = await ServicoModel.findOne({ servicoID });
        if (!servico) {
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        return res.status(200).json(servico);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar o serviço' });
    }
};

export const getAllServicos = async (req: Request, res: Response) => {
    try {
        const servicos = await ServicoModel.find();
        return res.status(200).json(servicos);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar os serviços' });
    }
};

export const getServicoByUser = async (req: Request, res: Response) => {
    const { userID } = req.params;
    try {
        const servicos = await ServicoModel.find({ userID });
        if (!servicos) {
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        return res.status(200).json(servicos);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar o serviço' });
    }
};
export const getServicoByCategoria = async (req: Request, res: Response) => {
    const { categoria } = req.params;
    try {
        const servicos = await ServicoModel.find({ categoria });
        if (!servicos) {
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        return res.status(200).json(servicos);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar o serviço' });
    }
};

export const createServico = (req: Request, res: Response) => {
    try {
        const servico = new ServicoModel(req.body);
        servico.save();
        return res.status(201).json(servico);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar o serviço' });
    }
};

export const updateServico = (req: Request, res: Response) => {
    try {
        const { servicoID } = req.params;
        const servico = new ServicoModel(req.body);
        ServicoModel.findOneAndUpdate({ servicoID }, servico);
        return res.status(200).json(servico);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar o serviço' });
    }
};

export const deleteServico = (req: Request, res: Response) => {
    try {
        const { servicoID } = req.params;
        ServicoModel.findOneAndDelete({ servicoID });
        return res.status(200).json({ message: 'Serviço removido com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao remover o serviço' });
    }
};



