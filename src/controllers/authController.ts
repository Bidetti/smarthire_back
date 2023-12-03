import { Request, Response } from "express";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RecoverCodeModel from "../models/recoverModel";
import { sendEmail } from "../email/config";

export const conectarUsuario = async (req: Request, res: Response) => {
    try {
        const { email, senha } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        const senhaValida = await bcrypt.compare(senha, user.senha!);
        if (!senhaValida) {
            return res.status(401).json({ error: "Senha inválida" });
        }

        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET as string, { expiresIn: "2h" });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao conectar o usuário' });
    }
};

export const recoverCode = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email: email }).select("_id");
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        const code = Math.floor(100000 + Math.random() * 900000);
        const codeHash = await bcrypt.hash(code.toString(), 10);
        const newCode = new RecoverCodeModel({ userID: user._id, code: codeHash });
        await newCode.save();
        sendEmail({
            to: email,
            subject: "Recuperação de senha",
            template: "recover",
            context: {
                codigo: code,
                name: user.nomeCompleto,
            },
        }).catch((err) => {
            return res.status(500).json({ error: "Erro ao enviar o email" });
        });
        return res.status(200).json({ userID: user._id });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao enviar código de recuperação!' });
    }
};

export const verifyCode = async (req: Request, res: Response) => {
    try {
        const code = await RecoverCodeModel.findOne({ userID: req.body.userID});
        if (!code) {
            return res.status(404).json({ error: "Código não encontrado" });
        }
        const validCode = await bcrypt.compare(req.body.code.toString(), code.code.toString());
        if (!validCode) {
            return res.status(401).json({ error: "Código inválido" });
        }
        const reset_token = jwt.sign({ userID: req.body.userID }, process.env.JWT_SECRET as string, { expiresIn: "5m" });
        code ? await RecoverCodeModel.findByIdAndDelete(code._id) : null;
        return res.status(200).json({ reset_token });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao verificar o código' });
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { userID, senha, reset_token } = req.body;
        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        const validToken = jwt.verify(reset_token, process.env.JWT_SECRET as string);
        if (!validToken) {
            return res.status(401).json({ error: "Token inválido" });
        }
        const senhaHash = bcrypt.hashSync(senha, 10);
        await UserModel.findByIdAndUpdate(userID, { senha: senhaHash });
        return res.status(200).json({ message: "Senha alterada com sucesso" });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao resetar a senha!" });
    }
}

export const verifyJWT = async(req: Request, res: Response) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: "Token não encontrado" });
        }
        const [, jwtToken] = token.split("Bearer "); 
        jwt.verify(jwtToken, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({ error: "Token inválido!" });
            }
            res.status(200).json({ jwt: true });
        });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao verificar o token" });
    }
}