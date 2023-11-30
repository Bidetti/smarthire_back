import { Request, Response } from "express";
import AvaliacaoModel from "../models/avaliacaoModel";
import logger from "../config/logger";

export const getAvaliacaoById = async (req: Request, res: Response) => {
    const { avaliacaoID } = req.params;
    try {
        const avaliacao = await AvaliacaoModel.findOne({ avaliacaoID });
        if (!avaliacao) {
        return res.status(404).json({ message: "Avaliação não encontrada" });
        }
        return res.status(200).json(avaliacao);
    } catch (error) {
        logger.error('Erro ao buscar a avaliação', error);
        return res.status(500).json({ error: "Erro ao buscar a avaliação" });
    }
    };

export const getAllAvaliacoes = async (req: Request, res: Response) => {
    try {
        const avaliacoes = await AvaliacaoModel.find();
        return res.status(200).json(avaliacoes);
    } catch (error) {
        logger.error('Erro ao buscar as avaliações', error);
        return res.status(500).json({ error: "Erro ao buscar as avaliações" });
    }
};

export const getAvaliacaoByUser = async (req: Request, res: Response) => {
    const { userID } = req.params;
    try {
        const avaliacoes = await AvaliacaoModel.find({ userID });
        if (!avaliacoes) {
            return res.status(404).json({ error: "Avaliação não encontrada" });
        }
        return res.status(200).json(avaliacoes);
    } catch (error) {
        logger.error('Erro ao buscar a avaliação', error);
        return res.status(500).json({ error: "Erro ao buscar a avaliação" });
    }
};

export const createAvaliacao = (req: Request, res: Response) => {
    try {
        const avaliacao = new AvaliacaoModel(req.body);
        avaliacao.save();
        return res.status(201).json(avaliacao);
    } catch (error) {
        logger.error('Erro ao criar a avaliação', error);
        return res.status(500).json({ error: "Erro ao criar a avaliação" });
    }
};

export const updateAvaliacao = async (req: Request, res: Response) => {
    try {
        const { avaliacaoID } = req.params;
        const avaliacao = new AvaliacaoModel(req.body);
        await AvaliacaoModel.findOneAndUpdate({ avaliacaoID }, avaliacao);
        return res.status(200).json(avaliacao);
    } catch (error) {
        logger.error('Erro ao atualizar a avaliação', error);
        return res.status(500).json({ error: "Erro ao atualizar a avaliação" });
    }
};

export const deleteAvaliacao = async (req: Request, res: Response) => {
    try {
        const { avaliacaoID } = req.params;
        await AvaliacaoModel.findOneAndDelete({ avaliacaoID });
        return res.status(200).json({ message: "Avaliação removida com sucesso" });
    } catch (error) {
        logger.error('Erro ao remover a avaliação', error);
        return res.status(500).json({ error: "Erro ao remover a avaliação" });
    }
};