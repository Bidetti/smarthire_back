"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRegistro = exports.updateRegistro = exports.createRegistro = exports.getRegistroByServico = exports.getAllRegistros = exports.getRegistroById = void 0;
const registroModel_1 = __importDefault(require("../models/registroModel"));
const logger_1 = __importDefault(require("../config/logger"));
const getRegistroById = async (req, res) => {
    const { registroID } = req.params;
    try {
        const registro = await registroModel_1.default.findOne({ registroID });
        if (!registro) {
            logger_1.default.error(`Registro ${registroID} não encontrado`);
            return res.status(404).json({ message: "Registro não encontrado" });
        }
        logger_1.default.info(`Registro ${registroID} encontrado com sucesso`);
        return res.status(200).json(registro);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar o registro', error);
        return res.status(500).json({ message: "Erro ao buscar o registro" });
    }
};
exports.getRegistroById = getRegistroById;
const getAllRegistros = async (req, res) => {
    try {
        const registros = await registroModel_1.default.find();
        logger_1.default.info('Registros encontrados com sucesso');
        return res.status(200).json(registros);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar os registros', error);
        return res.status(500).json({ message: "Erro ao buscar os registros" });
    }
};
exports.getAllRegistros = getAllRegistros;
const getRegistroByServico = async (req, res) => {
    const { servicoID } = req.params;
    try {
        const registros = await registroModel_1.default.find({ servicoID });
        if (!registros) {
            logger_1.default.error(`Registro ${servicoID} não encontrado`);
            return res.status(404).json({ message: "Registro não encontrado" });
        }
        logger_1.default.info(`Registro ${servicoID} encontrado com sucesso`);
        return res.status(200).json(registros);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar o registro', error);
        return res.status(500).json({ message: "Erro ao buscar o registro" });
    }
};
exports.getRegistroByServico = getRegistroByServico;
const createRegistro = (req, res) => {
    try {
        const registro = new registroModel_1.default(req.body);
        registro.save();
        logger_1.default.info(`Registro ${registro._id} criado com sucesso`);
        return res.status(201).json(registro);
    }
    catch (error) {
        logger_1.default.error('Erro ao criar o registro', error);
        return res.status(500).json({ message: "Erro ao criar o registro" });
    }
};
exports.createRegistro = createRegistro;
const updateRegistro = async (req, res) => {
    try {
        const { registroID } = req.params;
        const registro = new registroModel_1.default(req.body);
        await registroModel_1.default.findOneAndUpdate({ registroID }, registro);
        logger_1.default.info(`Registro ${registroID} atualizado com sucesso`);
        return res.status(200).json(registro);
    }
    catch (error) {
        logger_1.default.error('Erro ao atualizar o registro', error);
        return res.status(500).json({ message: "Erro ao atualizar o registro" });
    }
};
exports.updateRegistro = updateRegistro;
const deleteRegistro = async (req, res) => {
    try {
        const { registroID } = req.params;
        registroModel_1.default.findOneAndDelete({ registroID });
        logger_1.default.info(`Registro ${registroID} removido com sucesso`);
        return res.status(200).json({ message: "Registro removido com sucesso" });
    }
    catch (error) {
        logger_1.default.error('Erro ao remover o registro', error);
        return res.status(500).json({ message: "Erro ao remover o registro" });
    }
};
exports.deleteRegistro = deleteRegistro;
//# sourceMappingURL=registroController.js.map