import { Request, Response } from 'express';
import UserModel from '../models/userModel';

export const getUserById = async (req: Request, res: Response) => {
  const { userID } = req.params;
  try {
    const user = await UserModel.findOne({ userID });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar o usuário' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar os usuários' });
  }
};


export const createUser = (req: Request, res: Response) => {
  try {
    const user = new UserModel(req.body);
    user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar o usuário' });
  }
};

export const updateUser = (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = new UserModel(req.body);
    UserModel.findOneAndUpdate({ userID }, user);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar o usuário' });
  }
};

export const deleteUser = (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    UserModel.findOneAndDelete({ userID });
    return res.status(200).json({ message: 'Usuário removido com sucesso' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao remover o usuário' });
  }
};