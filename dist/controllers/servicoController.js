"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServico = exports.updateServico = exports.createServico = exports.getServicoByCategoria = exports.getServicoByUser = exports.getAllServicos = exports.getServicoById = void 0;
const servicoModel_1 = __importDefault(require("../models/servicoModel"));
const logger_1 = __importDefault(require("../config/logger"));
const getServicoById = async (req, res) => {
    const { servicoID } = req.params;
    try {
        const servico = await servicoModel_1.default.findOne({ servicoID });
        if (!servico) {
            logger_1.default.error(`Serviço ${servicoID} não encontrado`);
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        logger_1.default.info(`Serviço ${servicoID} encontrado com sucesso`);
        return res.status(200).json(servico);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar o serviço', error);
        return res.status(500).json({ message: 'Erro ao buscar o serviço' });
    }
};
exports.getServicoById = getServicoById;
const getAllServicos = async (req, res) => {
    try {
        const servicos = await servicoModel_1.default.find();
        logger_1.default.info('Serviços encontrados com sucesso');
        return res.status(200).json(servicos);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar os serviços', error);
        return res.status(500).json({ message: 'Erro ao buscar os serviços' });
    }
};
exports.getAllServicos = getAllServicos;
const getServicoByUser = async (req, res) => {
    const { userID } = req.params;
    try {
        const servicos = await servicoModel_1.default.find({ userID });
        if (!servicos) {
            logger_1.default.error(`Serviços do usuário ${userID} não encontrados`);
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        logger_1.default.info(`Serviços do usuário ${userID} encontrados com sucesso`);
        return res.status(200).json(servicos);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar o serviço', error);
        return res.status(500).json({ message: 'Erro ao buscar o serviço' });
    }
};
exports.getServicoByUser = getServicoByUser;
const getServicoByCategoria = async (req, res) => {
    const { categoria } = req.params;
    try {
        const servicos = await servicoModel_1.default.find({ categoria });
        if (!servicos) {
            logger_1.default.error(`Serviços da ${categoria} não encontrados`);
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        logger_1.default.info(`Serviços da ${categoria} encontrados com sucesso`);
        return res.status(200).json(servicos);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar o serviço', error);
        return res.status(500).json({ message: 'Erro ao buscar o serviço' });
    }
};
exports.getServicoByCategoria = getServicoByCategoria;
const createServico = (req, res) => {
    try {
        const servico = new servicoModel_1.default(req.body);
        servico.save();
        logger_1.default.info(`Serviço ${servico._id} criado com sucesso`);
        return res.status(201).json(servico);
    }
    catch (error) {
        logger_1.default.error('Erro ao criar o serviço', error);
        return res.status(500).json({ message: 'Erro ao criar o serviço' });
    }
};
exports.createServico = createServico;
const updateServico = (req, res) => {
    try {
        const { servicoID } = req.params;
        const servico = new servicoModel_1.default(req.body);
        servicoModel_1.default.findOneAndUpdate({ servicoID }, servico);
        logger_1.default.info(`Serviço ${servicoID} atualizado com sucesso`);
        return res.status(200).json(servico);
    }
    catch (error) {
        logger_1.default.error('Erro ao atualizar o serviço', error);
        return res.status(500).json({ message: 'Erro ao atualizar o serviço' });
    }
};
exports.updateServico = updateServico;
const deleteServico = (req, res) => {
    try {
        const { servicoID } = req.params;
        servicoModel_1.default.findOneAndDelete({ servicoID });
        logger_1.default.info(`Serviço ${servicoID} removido com sucesso`);
        return res.status(200).json({ message: 'Serviço removido com sucesso' });
    }
    catch (error) {
        logger_1.default.error('Erro ao remover o serviço', error);
        return res.status(500).json({ message: 'Erro ao remover o serviço' });
    }
};
exports.deleteServico = deleteServico;
//# sourceMappingURL=servicoController.js.map