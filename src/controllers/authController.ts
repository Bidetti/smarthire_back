import { Request, Response } from "express";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const conectarUsuario = async (req: Request, res: Response) => {
    try {
        const { email, senha } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            return res.status(401).json({ message: "Senha inválida" });
        }

        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET as string, { expiresIn: "2h" });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao conectar o usuário" });
    }
};