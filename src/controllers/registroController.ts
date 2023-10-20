import { Request, Response } from "express";
import RegistroModel from "../models/registroModel";

export const getRegistroById = async (req: Request, res: Response) => {
    const { registroID } = req.params;
    try {
        const registro = await RegistroModel.findOne({ registroID });
        if (!registro) {
            return res.status(404).json({ message: "Registro não encontrado" });
        }
        return res.status(200).json(registro);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar o registro" });
    }
};

export const getAllRegistros = async (req: Request, res: Response) => {
    try {
        const registros = await RegistroModel.find();
        return res.status(200).json(registros);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar os registros" });
    }
};

export const getRegistroByServico = async (req: Request, res: Response) => {
    const { servicoID } = req.params;
    try {
        const registros = await RegistroModel.find({ servicoID });
        if (!registros) {
            return res.status(404).json({ message: "Registro não encontrado" });
        }
        return res.status(200).json(registros);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar o registro" });
    }
}

export const createRegistro = (req: Request, res: Response) => {
    try {
        const registro = new RegistroModel(req.body);
        registro.save();
        return res.status(201).json(registro);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao criar o registro" });
    }
};

export const updateRegistro = async (req: Request, res: Response) => {
    try {
        const { registroID } = req.params;
        const registro = new RegistroModel(req.body);
        await RegistroModel.findOneAndUpdate({ registroID }, registro);
        return res.status(200).json(registro);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar o registro" });
    }
};

export const deleteRegistro = async (req: Request, res: Response) => {
    try {
        const { registroID } = req.params;
        RegistroModel.findOneAndDelete({ registroID });
        return res.status(200).json({ message: "Registro removido com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao remover o registro" });
    }
};