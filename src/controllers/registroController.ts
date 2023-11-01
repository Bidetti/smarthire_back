import { Request, Response } from "express";
import RegistroModel from "../models/registroModel";
import logger from "../config/logger";

export const getRegistroById = async (req: Request, res: Response) => {
    const { registroID } = req.params;
    try {
        const registro = await RegistroModel.findOne({ registroID });
        if (!registro) {
            logger.error(`Registro ${registroID} não encontrado`);
            return res.status(404).json({ message: "Registro não encontrado" });
        }
        logger.info(`Registro ${registroID} encontrado com sucesso`);
        return res.status(200).json(registro);
    } catch (error) {
        logger.error('Erro ao buscar o registro', error);
        return res.status(500).json({ message: "Erro ao buscar o registro" });
    }
};

export const getAllRegistros = async (req: Request, res: Response) => {
    try {
        const registros = await RegistroModel.find();
        logger.info('Registros encontrados com sucesso');
        return res.status(200).json(registros);
    } catch (error) {
        logger.error('Erro ao buscar os registros', error);
        return res.status(500).json({ message: "Erro ao buscar os registros" });
    }
};

export const getRegistroByServico = async (req: Request, res: Response) => {
    const { servicoID } = req.params;
    try {
        const registros = await RegistroModel.find({ servicoID });
        if (!registros) {
            logger.error(`Registro ${servicoID} não encontrado`);
            return res.status(404).json({ message: "Registro não encontrado" });
        }
        logger.info(`Registro ${servicoID} encontrado com sucesso`);
        return res.status(200).json(registros);
    } catch (error) {
        logger.error('Erro ao buscar o registro', error);
        return res.status(500).json({ message: "Erro ao buscar o registro" });
    }
}

export const createRegistro = (req: Request, res: Response) => {
    try {
        const registro = new RegistroModel(req.body);
        registro.save();
        logger.info(`Registro ${registro._id} criado com sucesso`);
        return res.status(201).json(registro);
    } catch (error) {
        logger.error('Erro ao criar o registro', error);
        return res.status(500).json({ message: "Erro ao criar o registro" });
    }
};

export const updateRegistro = async (req: Request, res: Response) => {
    try {
        const { registroID } = req.params;
        const registro = new RegistroModel(req.body);
        await RegistroModel.findOneAndUpdate({ registroID }, registro);
        logger.info(`Registro ${registroID} atualizado com sucesso`);
        return res.status(200).json(registro);
    } catch (error) {
        logger.error('Erro ao atualizar o registro', error);
        return res.status(500).json({ message: "Erro ao atualizar o registro" });
    }
};

export const deleteRegistro = async (req: Request, res: Response) => {
    try {
        const { registroID } = req.params;
        RegistroModel.findOneAndDelete({ registroID });
        logger.info(`Registro ${registroID} removido com sucesso`);
        return res.status(200).json({ message: "Registro removido com sucesso" });
    } catch (error) {
        logger.error('Erro ao remover o registro', error);
        return res.status(500).json({ message: "Erro ao remover o registro" });
    }
};