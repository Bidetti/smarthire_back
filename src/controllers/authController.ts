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
        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: "Senha inválida" });
        }

        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET as string, { expiresIn: "2h" });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao conectar o usuário" });
    }
};

export const recoverCode = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email: email }).select("_id");
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        const code = bcrypt.hashSync(Math.floor(Math.random() * 10000).toString(), 10);
        const newCode = new RecoverCodeModel({ userID: user._id, code });
        await newCode.save();
        sendEmail({
            to: email,
            subject: "Recuperação de senha",
            template: "recover",
            context: {
                code,
                name: user.nomeCompleto,
            },
        }).catch((err) => {
            return res.status(500).json({ error: "Erro ao enviar o email" });
        });
        return res.status(200).json({ userID: user._id });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao gerar o código" });
    }
};

export const verifyCode = async (req: Request, res: Response) => {
    try {
        const code = await RecoverCodeModel.findOne({ userID: req.body.userID});
        if (!code) {
            return res.status(404).json({ error: "Código não encontrado" });
        }
        const validCode = await bcrypt.compare(code.code.toString(), req.body.code.toString());
        if (!validCode) {
            return res.status(401).json({ error: "Código inválido" });
        }
        return res.status(200).json({ message: "Código válido" });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao verificar o código" });
    }
}