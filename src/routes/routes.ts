import express from 'express';
const router = express.Router();

import { authenticateUser } from '../middleware/securityMiddleware';

// Auth

import { conectarUsuario, recoverCode, verifyCode } from '../controllers/authController';

router.post('/auth', conectarUsuario);
router.post('/auth/recover', recoverCode);
router.post('/auth/verify', verifyCode);

// Avaliacao

import { createAvaliacao, deleteAvaliacao, getAllAvaliacoes, getAvaliacaoById, getAvaliacaoByUser, updateAvaliacao } from '../controllers/avaliacaoController';

router.get('/avaliacao/:avaliacaoID', getAvaliacaoById);
router.get('/avaliacao/user/:userID', getAvaliacaoByUser);
router.get('/avaliacao', getAllAvaliacoes);
router.post('/avaliacao', authenticateUser, createAvaliacao);
router.put('/avaliacao/:avaliacaoID', authenticateUser, updateAvaliacao);
router.delete('/avaliacao/:avaliacaoID', authenticateUser, deleteAvaliacao);

// Prestador

import { createPrestador, deletePrestador, getAllPrestadores, getPrestadorById, getPrestadoresByCategoria, updatePrestador } from '../controllers/prestadorController';

router.get('/prestador/:userID', getPrestadorById);
router.get('/prestador/categoria/:categoria', getPrestadoresByCategoria);
router.get('/prestador', getAllPrestadores);
router.post('/prestador', authenticateUser, createPrestador);
router.put('/prestador/:userID', authenticateUser, updatePrestador);
router.delete('/prestador/:userID', authenticateUser, deletePrestador);

// Proposta
import { createProposta, deleteProposta, getAllPropostas, getPropostaById, getPropostaByUser, updateProposta } from '../controllers/propostaController';

router.get('/proposta/:propostaID', getPropostaById);
router.get('/proposta/user/:userID', getPropostaByUser);
router.get('/proposta', getAllPropostas);
router.post('/proposta', authenticateUser, createProposta);
router.put('/proposta/:propostaID', authenticateUser, updateProposta);
router.delete('/proposta/:propostaID', authenticateUser, deleteProposta);

// Registro

import { createRegistro, deleteRegistro, getAllRegistros, getRegistroById, getRegistroByServico, updateRegistro } from '../controllers/registroController';

router.get('/registro/:registroID', getRegistroById);
router.get('/registro/servico/:servicoID', getRegistroByServico);
router.get('/registro', getAllRegistros);
router.post('/registro', authenticateUser, createRegistro);
router.put('/registro/:registroID', authenticateUser, updateRegistro);
router.delete('/registro/:registroID', authenticateUser, deleteRegistro);

// Servico

import { createServico, deleteServico, getAllServicos, getServicoById, getServicoByUser, updateServico } from '../controllers/servicoController';

router.get('/servico/:servicoID', getServicoById);
router.get('/servico/user/:userID', getServicoByUser);
router.get('/servico', getAllServicos);
router.post('/servico', authenticateUser, createServico);
router.put('/servico/:servicoID', authenticateUser, updateServico);
router.delete('/servico/:servicoID', authenticateUser, deleteServico);

// User

import { createUser, deleteUser, getAllUsers, getUserByEmail, getUserById, updateUser } from '../controllers/userController';

router.get('/user/:userID', getUserById);
router.get('/user/:email', getUserByEmail);
router.get('/user', getAllUsers);
router.post('/user', createUser);
router.put('/user/:userID', authenticateUser, updateUser);
router.delete('/user/:userID', authenticateUser, deleteUser);

export default router;
