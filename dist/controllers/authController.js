"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.resetPassword = exports.verifyCode = exports.recoverCode = exports.conectarUsuario = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const recoverModel_1 = __importDefault(require("../models/recoverModel"));
const config_1 = require("../email/config");
const logger_1 = __importDefault(require("../config/logger"));
const conectarUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await userModel_1.default.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        const senhaValida = await bcrypt_1.default.compare(senha, user.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: "Senha inválida" });
        }
        const token = jsonwebtoken_1.default.sign({ userID: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
        logger_1.default.info(`Usuário ${user._id} conectado com sucesso`);
        return res.status(200).json({ token });
    }
    catch (error) {
        logger_1.default.error('Erro ao conectar o usuário', error);
        return res.status(500).json({ error: 'Erro ao conectar o usuário' });
    }
};
exports.conectarUsuario = conectarUsuario;
const recoverCode = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel_1.default.findOne({ email: email }).select("_id");
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        const code = Math.floor(100000 + Math.random() * 900000);
        const codeHash = await bcrypt_1.default.hash(code.toString(), 10);
        const newCode = new recoverModel_1.default({ userID: user._id, code: codeHash });
        await newCode.save();
        (0, config_1.sendEmail)({
            to: email,
            subject: "Recuperação de senha",
            template: "recover",
            context: {
                codigo: code,
                name: user.nomeCompleto,
            },
        }).catch((err) => {
            logger_1.default.error('Erro ao enviar o email', err);
            return res.status(500).json({ error: "Erro ao enviar o email" });
        });
        logger_1.default.info(`Código de recuperação enviado para o usuário ${user._id}`);
        return res.status(200).json({ userID: user._id });
    }
    catch (error) {
        logger_1.default.error('Erro ao enviar código de recuperação', error);
        return res.status(500).json({ error: 'Erro ao enviar código de recuperação!' });
    }
};
exports.recoverCode = recoverCode;
const verifyCode = async (req, res) => {
    try {
        const code = await recoverModel_1.default.findOne({ userID: req.body.userID });
        if (!code) {
            return res.status(404).json({ error: "Código não encontrado" });
        }
        const validCode = await bcrypt_1.default.compare(req.body.code.toString(), code.code.toString());
        if (!validCode) {
            return res.status(401).json({ error: "Código inválido" });
        }
        const reset_token = jsonwebtoken_1.default.sign({ userID: req.body.userID }, process.env.JWT_SECRET, { expiresIn: "5m" });
        code ? await recoverModel_1.default.findByIdAndDelete(code._id) : null;
        logger_1.default.info(`Código ${code._id} verificado com sucesso`);
        return res.status(200).json({ reset_token });
    }
    catch (error) {
        logger_1.default.error('Erro ao verificar o código', error);
        return res.status(500).json({ error: 'Erro ao verificar o código' });
    }
};
exports.verifyCode = verifyCode;
const resetPassword = async (req, res) => {
    try {
        const { userID, senha, reset_token } = req.body;
        const user = await userModel_1.default.findById(userID);
        if (!user) {
            logger_1.default.error(`Usuário ${userID} não encontrado`);
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        const validToken = jsonwebtoken_1.default.verify(reset_token, process.env.JWT_SECRET);
        if (!validToken) {
            return res.status(401).json({ error: "Token inválido" });
        }
        const senhaHash = bcrypt_1.default.hashSync(senha, 10);
        await userModel_1.default.findByIdAndUpdate(userID, { senha: senhaHash });
        logger_1.default.info(`Senha do usuário ${userID} alterada com sucesso`);
        return res.status(200).json({ message: "Senha alterada com sucesso" });
    }
    catch (error) {
        logger_1.default.error('Erro ao resetar a senha', error);
        return res.status(500).json({ error: "Erro ao resetar a senha!" });
    }
};
exports.resetPassword = resetPassword;
const verifyJWT = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: "Token não encontrado" });
        }
        const [, jwtToken] = token.split("Bearer ");
        jsonwebtoken_1.default.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                logger_1.default.error('Token inválido', err);
                return res.status(401).json({ message: "Token inválido!" });
            }
            res.status(200).json({ jwt: true });
        });
    }
    catch (error) {
        logger_1.default.error('Erro ao verificar o token', error);
        return res.status(500).json({ error: "Erro ao verificar o token" });
    }
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=authController.js.map