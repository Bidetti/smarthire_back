import { Request, Response } from 'express';
import PrestadorModel from '../models/prestadorModel';
import logger from '../config/logger';

export const getPrestadorById = async (req: Request, res: Response) => {
  const { userID } = req.params;
  try {
    const prestador = await PrestadorModel.findOne({ userID });
    if (!prestador) {
      return res.status(404).json({ message: 'Prestador não encontrado' });
    }
    return res.status(200).json(prestador);
  } catch (error) {
    logger.error('Erro ao buscar o prestador', error);
    return res.status(500).json({ message: 'Erro ao buscar o prestador' });
  }
};

export const getPrestadoresByCategoria = async (req: Request, res: Response) => {
  const { categoria } = req.params;
  try {
    const prestadores = await PrestadorModel.find({ categoria });
    return res.status(200).json(prestadores);
  } catch (error) {
    logger.error('Erro ao buscar prestadores por categoria', error);
    return res.status(500).json({ message: 'Erro ao buscar prestadores por categoria' });
  }
};

export const getAllPrestadores = async (req: Request, res: Response) => {
  try {
    const prestadores = await PrestadorModel.find();
    return res.status(200).json(prestadores);
  } catch (error) {
    logger.error('Erro ao buscar os prestadores', error);
    return res.status(500).json({ message: 'Erro ao buscar os prestadores' });
  }
};

export const createPrestador = (req: Request, res: Response) => {
  try {
    const prestador = new PrestadorModel(req.body);
    prestador.save();
    return res.status(201).json(prestador);
  } catch (error) {
    logger.error('Erro ao criar o prestador', error);
    return res.status(500).json({ message: 'Erro ao criar o prestador' });
  }
};

export const updatePrestador = (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const prestador = new PrestadorModel(req.body);
    PrestadorModel.findOneAndUpdate({ userID }, prestador);
    return res.status(200).json(prestador);
  } catch (error) {
    logger.error('Erro ao atualizar o prestador', error);
    return res.status(500).json({ message: 'Erro ao atualizar o prestador' });
  }
};

export const deletePrestador = (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    PrestadorModel.findOneAndDelete({ userID });
    return res.status(200).json({ message: 'Prestador removido com sucesso' });
  } catch (error) {
    logger.error('Erro ao remover o prestador', error);
    return res.status(500).json({ message: 'Erro ao remover o prestador' });
  }
};
