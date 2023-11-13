"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePrestador = exports.updatePrestador = exports.createPrestador = exports.getAllPrestadores = exports.getPrestadoresByCategoria = exports.getPrestadorById = void 0;
const prestadorModel_1 = __importDefault(require("../models/prestadorModel"));
const logger_1 = __importDefault(require("../config/logger"));
const getPrestadorById = async (req, res) => {
    const { userID } = req.params;
    try {
        const prestador = await prestadorModel_1.default.findOne({ userID });
        if (!prestador) {
            return res.status(404).json({ message: 'Prestador não encontrado' });
        }
        return res.status(200).json(prestador);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar o prestador', error);
        return res.status(500).json({ message: 'Erro ao buscar o prestador' });
    }
};
exports.getPrestadorById = getPrestadorById;
const getPrestadoresByCategoria = async (req, res) => {
    const { categoria } = req.params;
    try {
        const prestadores = await prestadorModel_1.default.find({ categoria });
        return res.status(200).json(prestadores);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar prestadores por categoria', error);
        return res.status(500).json({ message: 'Erro ao buscar prestadores por categoria' });
    }
};
exports.getPrestadoresByCategoria = getPrestadoresByCategoria;
const getAllPrestadores = async (req, res) => {
    try {
        const prestadores = await prestadorModel_1.default.find();
        return res.status(200).json(prestadores);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar os prestadores', error);
        return res.status(500).json({ message: 'Erro ao buscar os prestadores' });
    }
};
exports.getAllPrestadores = getAllPrestadores;
const createPrestador = (req, res) => {
    try {
        const prestador = new prestadorModel_1.default(req.body);
        prestador.save();
        return res.status(201).json(prestador);
    }
    catch (error) {
        logger_1.default.error('Erro ao criar o prestador', error);
        return res.status(500).json({ message: 'Erro ao criar o prestador' });
    }
};
exports.createPrestador = createPrestador;
const updatePrestador = (req, res) => {
    try {
        const { userID } = req.params;
        const prestador = new prestadorModel_1.default(req.body);
        prestadorModel_1.default.findOneAndUpdate({ userID }, prestador);
        return res.status(200).json(prestador);
    }
    catch (error) {
        logger_1.default.error('Erro ao atualizar o prestador', error);
        return res.status(500).json({ message: 'Erro ao atualizar o prestador' });
    }
};
exports.updatePrestador = updatePrestador;
const deletePrestador = (req, res) => {
    try {
        const { userID } = req.params;
        prestadorModel_1.default.findOneAndDelete({ userID });
        return res.status(200).json({ message: 'Prestador removido com sucesso' });
    }
    catch (error) {
        logger_1.default.error('Erro ao remover o prestador', error);
        return res.status(500).json({ message: 'Erro ao remover o prestador' });
    }
};
exports.deletePrestador = deletePrestador;
//# sourceMappingURL=prestadorController.js.map