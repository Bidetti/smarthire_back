"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAvaliacao = exports.updateAvaliacao = exports.createAvaliacao = exports.getAvaliacaoByUser = exports.getAllAvaliacoes = exports.getAvaliacaoById = void 0;
const avaliacaoModel_1 = __importDefault(require("../models/avaliacaoModel"));
const logger_1 = __importDefault(require("../config/logger"));
const getAvaliacaoById = async (req, res) => {
    const { avaliacaoID } = req.params;
    try {
        const avaliacao = await avaliacaoModel_1.default.findOne({ avaliacaoID });
        if (!avaliacao) {
            return res.status(404).json({ message: "Avaliação não encontrada" });
        }
        return res.status(200).json(avaliacao);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar a avaliação', error);
        return res.status(500).json({ message: "Erro ao buscar a avaliação" });
    }
};
exports.getAvaliacaoById = getAvaliacaoById;
const getAllAvaliacoes = async (req, res) => {
    try {
        const avaliacoes = await avaliacaoModel_1.default.find();
        return res.status(200).json(avaliacoes);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar as avaliações', error);
        return res.status(500).json({ message: "Erro ao buscar as avaliações" });
    }
};
exports.getAllAvaliacoes = getAllAvaliacoes;
const getAvaliacaoByUser = async (req, res) => {
    const { userID } = req.params;
    try {
        const avaliacoes = await avaliacaoModel_1.default.find({ userID });
        if (!avaliacoes) {
            return res.status(404).json({ message: "Avaliação não encontrada" });
        }
        return res.status(200).json(avaliacoes);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar a avaliação', error);
        return res.status(500).json({ message: "Erro ao buscar a avaliação" });
    }
};
exports.getAvaliacaoByUser = getAvaliacaoByUser;
const createAvaliacao = (req, res) => {
    try {
        const avaliacao = new avaliacaoModel_1.default(req.body);
        avaliacao.save();
        return res.status(201).json(avaliacao);
    }
    catch (error) {
        logger_1.default.error('Erro ao criar a avaliação', error);
        return res.status(500).json({ message: "Erro ao criar a avaliação" });
    }
};
exports.createAvaliacao = createAvaliacao;
const updateAvaliacao = async (req, res) => {
    try {
        const { avaliacaoID } = req.params;
        const avaliacao = new avaliacaoModel_1.default(req.body);
        await avaliacaoModel_1.default.findOneAndUpdate({ avaliacaoID }, avaliacao);
        return res.status(200).json(avaliacao);
    }
    catch (error) {
        logger_1.default.error('Erro ao atualizar a avaliação', error);
        return res.status(500).json({ message: "Erro ao atualizar a avaliação" });
    }
};
exports.updateAvaliacao = updateAvaliacao;
const deleteAvaliacao = async (req, res) => {
    try {
        const { avaliacaoID } = req.params;
        await avaliacaoModel_1.default.findOneAndDelete({ avaliacaoID });
        return res.status(200).json({ message: "Avaliação removida com sucesso" });
    }
    catch (error) {
        logger_1.default.error('Erro ao remover a avaliação', error);
        return res.status(500).json({ message: "Erro ao remover a avaliação" });
    }
};
exports.deleteAvaliacao = deleteAvaliacao;
//# sourceMappingURL=avaliacaoController.js.map