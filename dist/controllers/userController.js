"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getAllUsers = exports.getUserByEmail = exports.getUserById = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_1 = __importDefault(require("../config/logger"));
const getUserById = async (req, res) => {
    const { userID } = req.params;
    try {
        const user = await userModel_1.default.findById({ userID }).select('-password');
        if (!user) {
            logger_1.default.error(`Usuário ${userID} não encontrado`);
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        logger_1.default.info(`Usuário ${userID} buscado com sucesso`);
        return res.status(200).json(user);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar o usuário', error);
        return res.status(500).json({ message: 'Erro ao buscar o usuário' });
    }
};
exports.getUserById = getUserById;
const getUserByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await userModel_1.default.findOne({ email: email }).select('-password');
        if (!user) {
            logger_1.default.error(`Usuário ${email} não encontrado`);
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        logger_1.default.info(`Usuário ${email} buscado com sucesso`);
        return res.status(200).json(user);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar o usuário', error);
        return res.status(500).json({ message: 'Erro ao buscar o usuário' });
    }
};
exports.getUserByEmail = getUserByEmail;
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel_1.default.find().select('-password');
        logger_1.default.info('Usuários buscados com sucesso');
        return res.status(200).json(users);
    }
    catch (error) {
        logger_1.default.error('Erro ao buscar os usuários', error);
        return res.status(500).json({ message: 'Erro ao buscar os usuários' });
    }
};
exports.getAllUsers = getAllUsers;
const createUser = async (req, res) => {
    try {
        const user = req.body;
        user.senha = bcrypt_1.default.hashSync(user.senha, 10);
        const newUser = new userModel_1.default(user);
        await newUser.save();
        const userObject = newUser.toObject();
        delete userObject.senha;
        logger_1.default.info(`Usuário ${userObject._id} criado com sucesso`);
        return res.status(201).json(userObject);
    }
    catch (error) {
        logger_1.default.error('Erro ao criar o usuário', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'CPF, E-mail ou Telefone já existe!' });
        }
        return res.status(500).json({ message: 'Erro ao criar o usuário' });
    }
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    try {
        const { userID } = req.params;
        const user = new userModel_1.default(req.body);
        userModel_1.default.findOneAndUpdate({ userID }, user);
        logger_1.default.info(`Usuário ${userID} atualizado com sucesso`);
        return res.status(200).json(user);
    }
    catch (error) {
        logger_1.default.error('Erro ao atualizar o usuário', error);
        return res.status(500).json({ message: 'Erro ao atualizar o usuário' });
    }
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    try {
        const { userID } = req.params;
        userModel_1.default.findOneAndDelete({ userID });
        logger_1.default.info(`Usuário ${userID} removido com sucesso`);
        return res.status(200).json({ message: 'Usuário removido com sucesso' });
    }
    catch (error) {
        logger_1.default.error('Erro ao remover o usuário', error);
        return res.status(500).json({ message: 'Erro ao remover o usuário' });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map