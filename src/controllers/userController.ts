import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import bcrypt from "bcrypt";

export const getUserById = async (req: Request, res: Response) => {
  const { userID } = req.params;
  try {
    const user = await UserModel.findById(userID).select('-senha');
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar o usuário' });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await UserModel.findOne({ email: email }).select('-senha');
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar o usuário' });
  }
};


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find().select('-senha');
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar os usuários' });
  }
};


export const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    user.senha = bcrypt.hashSync(user.senha, 10);
    const newUser = new UserModel(user);
    await newUser.save();
    const userObject = newUser.toObject();
    delete userObject.senha;
    return res.status(201).json(userObject);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'CPF, E-mail ou Telefone já existe!' });
    }
    return res.status(500).json({ error: 'Erro ao criar o usuário' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = req.body;
    const updatedUser = await UserModel.findOneAndUpdate({ _id: userID }, user, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuário não encontrado!' });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar o usuário' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const deletedUser = await UserModel.findOneAndDelete({ _id: userID });
    if (!deletedUser) {
      return res.status(404).json({ error: 'Usuário não encontrado!' });
    }
    return res.status(200).json({ message: 'Usuário removido com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao remover o usuário' });
  }
};