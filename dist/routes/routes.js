"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const securityMiddleware_1 = require("../middleware/securityMiddleware");
// Auth
const authController_1 = require("../controllers/authController");
router.post('/auth', authController_1.conectarUsuario);
router.post('/auth/recover', authController_1.recoverCode);
router.post('/auth/verify', authController_1.verifyCode);
router.post('/auth/resetpwd', authController_1.resetPassword);
router.get('/auth/verifyjwt', authController_1.verifyJWT);
// Avaliacao
const avaliacaoController_1 = require("../controllers/avaliacaoController");
router.get('/avaliacao/:avaliacaoID', avaliacaoController_1.getAvaliacaoById);
router.get('/avaliacao/user/:userID', avaliacaoController_1.getAvaliacaoByUser);
router.get('/avaliacao', avaliacaoController_1.getAllAvaliacoes);
router.post('/avaliacao', securityMiddleware_1.authenticateUser, avaliacaoController_1.createAvaliacao);
router.put('/avaliacao/:avaliacaoID', securityMiddleware_1.authenticateUser, avaliacaoController_1.updateAvaliacao);
router.delete('/avaliacao/:avaliacaoID', securityMiddleware_1.authenticateUser, avaliacaoController_1.deleteAvaliacao);
// Prestador
const prestadorController_1 = require("../controllers/prestadorController");
router.get('/prestador/:userID', prestadorController_1.getPrestadorById);
router.get('/prestador/categoria/:categoria', prestadorController_1.getPrestadoresByCategoria);
router.get('/prestador', prestadorController_1.getAllPrestadores);
router.post('/prestador', securityMiddleware_1.authenticateUser, prestadorController_1.createPrestador);
router.put('/prestador/:userID', securityMiddleware_1.authenticateUser, prestadorController_1.updatePrestador);
router.delete('/prestador/:userID', securityMiddleware_1.authenticateUser, prestadorController_1.deletePrestador);
// Proposta
const propostaController_1 = require("../controllers/propostaController");
router.get('/proposta/:propostaID', propostaController_1.getPropostaById);
router.get('/proposta/user/:userID', propostaController_1.getPropostaByUser);
router.get('/proposta', propostaController_1.getAllPropostas);
router.post('/proposta', securityMiddleware_1.authenticateUser, propostaController_1.createProposta);
router.put('/proposta/:propostaID', securityMiddleware_1.authenticateUser, propostaController_1.updateProposta);
router.delete('/proposta/:propostaID', securityMiddleware_1.authenticateUser, propostaController_1.deleteProposta);
// Registro
const registroController_1 = require("../controllers/registroController");
router.get('/registro/:registroID', registroController_1.getRegistroById);
router.get('/registro/servico/:servicoID', registroController_1.getRegistroByServico);
router.get('/registro', registroController_1.getAllRegistros);
router.post('/registro', securityMiddleware_1.authenticateUser, registroController_1.createRegistro);
router.put('/registro/:registroID', securityMiddleware_1.authenticateUser, registroController_1.updateRegistro);
router.delete('/registro/:registroID', securityMiddleware_1.authenticateUser, registroController_1.deleteRegistro);
// Servico
const servicoController_1 = require("../controllers/servicoController");
router.get('/servico/:servicoID', servicoController_1.getServicoById);
router.get('/servico/user/:userID', servicoController_1.getServicoByUser);
router.get('/servico', servicoController_1.getAllServicos);
router.post('/servico', securityMiddleware_1.authenticateUser, servicoController_1.createServico);
router.put('/servico/:servicoID', securityMiddleware_1.authenticateUser, servicoController_1.updateServico);
router.delete('/servico/:servicoID', securityMiddleware_1.authenticateUser, servicoController_1.deleteServico);
// User
const userController_1 = require("../controllers/userController");
router.get('/user/:userID', userController_1.getUserById);
router.get('/user/:email', userController_1.getUserByEmail);
router.get('/user', userController_1.getAllUsers);
router.post('/user', userController_1.createUser);
router.put('/user/:userID', securityMiddleware_1.authenticateUser, userController_1.updateUser);
router.delete('/user/:userID', securityMiddleware_1.authenticateUser, userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=routes.js.map