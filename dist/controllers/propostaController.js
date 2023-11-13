"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProposta = exports.updateProposta = exports.createProposta = exports.getPropostaByUser = exports.getAllPropostas = exports.getPropostaById = void 0;
const propostaModel_1 = __importDefault(require("../models/propostaModel"));
const logger_1 = __importDefault(require("../config/logger"));
const getPropostaById = async (req, res) => {
    const { propostaID } = req.params;
    try {
        const proposta = await propostaModel_1.default.findOne({ propostaID });
        if (!proposta) {
            return res.status(404).json({ message: 'Proposta não encontrada' });
        }
        return res.status(200).json(proposta);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar a proposta', error);
        return res.status(500).json({ message: 'Erro ao buscar a proposta' });
    }
};
exports.getPropostaById = getPropostaById;
const getAllPropostas = async (req, res) => {
    try {
        const propostas = await propostaModel_1.default.find();
        return res.status(200).json(propostas);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar as propostas', error);
        return res.status(500).json({ message: 'Erro ao buscar as propostas' });
    }
};
exports.getAllPropostas = getAllPropostas;
const getPropostaByUser = async (req, res) => {
    const { userID } = req.params;
    try {
        const propostas = await propostaModel_1.default.find({ userID });
        if (!propostas) {
            return res.status(404).json({ message: 'Proposta não encontrada' });
        }
        return res.status(200).json(propostas);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar a proposta', error);
        return res.status(500).json({ message: 'Erro ao buscar a proposta' });
    }
};
exports.getPropostaByUser = getPropostaByUser;
const createProposta = (req, res) => {
    try {
        const proposta = new propostaModel_1.default(req.body);
        proposta.save();
        return res.status(201).json(proposta);
    }
    catch (error) {
        logger_1.default.error('Erro ao criar a proposta', error);
        return res.status(500).json({ message: 'Erro ao criar a proposta' });
    }
};
exports.createProposta = createProposta;
const updateProposta = async (req, res) => {
    try {
        const { propostaID } = req.params;
        const proposta = new propostaModel_1.default(req.body);
        await propostaModel_1.default.findOneAndUpdate({ propostaID }, proposta);
        return res.status(200).json(proposta);
    }
    catch (error) {
        logger_1.default.error('Erro ao atualizar a proposta', error);
        return res.status(500).json({ message: 'Erro ao atualizar a proposta' });
    }
};
exports.updateProposta = updateProposta;
const deleteProposta = async (req, res) => {
    try {
        const { propostaID } = req.params;
        await propostaModel_1.default.findOneAndDelete({ propostaID });
        return res.status(200).json({ message: 'Proposta removida com sucesso' });
    }
    catch (error) {
        logger_1.default.error('Erro ao remover a proposta', error);
        return res.status(500).json({ message: 'Erro ao remover a proposta' });
    }
};
exports.deleteProposta = deleteProposta;
//# sourceMappingURL=propostaController.js.map