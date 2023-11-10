const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

const indexControllerRead = require("../controllers/indexControllerRead");

const agendamentoControllerRead = require("../controllers/agendamentoController/agendamentoControllerRead");

const perfilControllerRead = require("../controllers/homeperfilController/perfilControllerRead");

const editarPerfilControllerRead = require("../controllers/perfilController/editarPerfilControllerRead");
const editarPerfilControllerUpdate = require("../controllers/perfilController/editarPerfilControllerUpdate");

const privacidadeControllerRead = require("../controllers/privacidadeController/privacidadeControllerRead");
const termosControllerRead = require("../controllers/termosController/termosControllerRead");

const doacaoControllerRead = require("../controllers/doacaoController/doacaoControllerRead");

const profissionaisControllerRead = require("../controllers/profissionaisController/profissionaisControllerRead");

const rodaConversaControllerRead = require("../controllers/rodaConversaController/rodaConversaControllerRead");
const rodaConversaSessoesControllerRead = require("../controllers/rodasDeConversaSessoes/rodasDeConversaSessoesControllerRead.js");
const sessaoControllerRead = require("../controllers/sessaoController/sessaoControllerControllerRead.js");

const autenticacaoMiddleware = require("../middlewares/autenticacaoMiddleware");
const regrasValidacaoMiddleware = require("../middlewares/regrasValidacaoMiddleware");
const validacaoFormulariosMiddleware = require("../middlewares/validacaoFormulariosMiddleware");

const loginControllerRead = require("../controllers/loginController/loginControllerRead");
const loginControllerAuth = require("../controllers/loginController/loginControllerAuth");

const cadastroControllerRead = require("../controllers/cadastroController/cadastroControllerRead.js");
const cadastroControllerCreate = require("../controllers/cadastroController/cadastroControllerCreate");

const cadastroProfissionalControllerRead = require("../controllers/cadastroProfissionalController/cadastroProfissionalControllerRead.js");
const cadastroProfissionalControllerCreate = require("../controllers/cadastroProfissionalController/cadastroProfissionalControllerCreate.js");

const homePerfilProfissionalControllerRead = require('../controllers/homePerfilProfissionalController/homePerfilProfissionalControllerRead.js');
const perfilProfissionalPacienteControllerRead = require("../controllers/perfilProfissionalController/perfilProfissionalPacienteControllerRead.js");

const editarPerfilProfissionalControllerRead = require("../controllers/perfilProfissionalController/editarPerfilProfissionalControllerRead.js");
const editarPerfilProfissionalControllerUpdate = require("../controllers/perfilProfissionalController/editarPerfilProfissionalControllerUpdate.js");

const deletarPerfilProfissionalControllerDelete = require("../controllers/perfilProfissionalController/deletarPerfilProfissionalControllerDelete.js");

const cadastroDesabafoControllerRead = require("../controllers/desabafoController/desabafoControllerCreate");

const sairControllerRead = require("../controllers/sairControllerRead.js");

const deletaController = require('../controllers/perfilController/perfilControllerDeletar');

const imagemPerfilPacienteControllerRead = require("../controllers/imagensControllers/imagemPerfilPacienteControllerRead.js");
const imagemCapaRodasDeConversaControllerRead = require("../controllers/imagensControllers/imagemCapaRodasDeConversaControllerRead.js");
const imagemPerfilProfissionalControllerRead = require("../controllers/imagensControllers/imagemPerfilProfissionalControllerRead.js");

const homeAdminControllerRead = require("../controllers/adminControllers/homeAdminController/homeAdminControllerRead.js");
const profissionaisAdminControllerRead = require("../controllers/adminControllers/profissonaisAdminController/profissionaisAdminControllerRead.js");

const editarUsuarioAdminControllerRead = require("../controllers/adminControllers/usuarioAdminController/editarUsuarioAdminControllerRead.js");
const editarUsuarioAdminControllerUpdate = require("../controllers/adminControllers/usuarioAdminController/editarUsuarioAdminControllerUpdate.js");

const editarProfissionalAdminControllerRead = require("../controllers/adminControllers/profissonaisAdminController/editarProfissionalAdminControllerRead.js");
const editarProfissionalAdminControllerUpdate = require("../controllers/adminControllers/profissonaisAdminController/editarProfissionalAdminControllerUpdate.js");

const deletarUsuarioAdminControllerDelete = require("../controllers/adminControllers/usuarioAdminController/deletarUsuarioAdminControllerDelete.js");
const deletarProfissionalAdminControllerDelete = require("../controllers/adminControllers/profissonaisAdminController/deletarProfissionalAdminControllerDelete.js");

const rodasDeConversaAdminControllerRead = require("../controllers/adminControllers/rodasDeConversaAdminController/rodasDeConversaAdminControllerRead.js");

const criarRodaDeConversaAdminControllerRead = require("../controllers/adminControllers/rodasDeConversaAdminController/criarRodaDeConversaAdminControllerRead.js");
const criarRodaDeConversaAdminControllerCreate = require("../controllers/adminControllers/rodasDeConversaAdminController/criarRodaDeConversaAdminControllerCreate.js");

const deletarRodaDeConversaAdminControllerDelete = require("../controllers/adminControllers/rodasDeConversaAdminController/deletarRodaDeConversaAdminControllerDelete.js");

const editarRodaDeConversaAdminControllerRead = require("../controllers/adminControllers/rodasDeConversaAdminController/editarRodaDeConversaAdminControllerRead.js");
const editarRodaDeConversaAdminControllerUpdate = require("../controllers/adminControllers/rodasDeConversaAdminController/editarRodaDeConversaAdminControllerUpdate.js");

router.get("/", indexControllerRead.returnPage);

router.get("/sair", sairControllerRead.logout);

router.get("/privacidade", privacidadeControllerRead.returnPage);

router.get("/termos", termosControllerRead.returnPage);

router.get("/perfil",
autenticacaoMiddleware.validateJWT,
perfilControllerRead.returnPage);

router.get("/agendamento", agendamentoControllerRead.returnPage);

router.get("/doacao", doacaoControllerRead.returnPage);

router.get("/profissionais", profissionaisControllerRead.returnPage);

router.get("/deletar-perfil",
autenticacaoMiddleware.validateJWT,
deletaController.deletarUsuario);

router.get("/rodas-de-conversa",
autenticacaoMiddleware.validateJWT,
rodaConversaControllerRead.returnPage);

router.get("/rodas-de-conversa-sessoes",
autenticacaoMiddleware.validateJWT,
rodaConversaSessoesControllerRead.returnPage);

router.get("/sessao",
autenticacaoMiddleware.validateJWT,
sessaoControllerRead.returnPage);

router.get("/cadastro", cadastroControllerRead.returnPage);
router.post("/cadastro",
regrasValidacaoMiddleware.cadastroValidationRules,
validacaoFormulariosMiddleware.validacaoCadastro,
autenticacaoMiddleware.encriptarSenha,
cadastroControllerCreate.createUsuario);

router.get("/cadastro-profissional", cadastroProfissionalControllerRead.returnPage);

router.post("/cadastro-profissional",
upload.single("foto_perfil"),
regrasValidacaoMiddleware.cadastroProfissionalValidationRules,
validacaoFormulariosMiddleware.validacaoCadastroProfissional,
autenticacaoMiddleware.encriptarSenha,
cadastroProfissionalControllerCreate.createProfissional);

router.get("/login", loginControllerRead.getPage);
router.post("/login",
validacaoFormulariosMiddleware.validacaoLogin,
loginControllerAuth.autorizarUsuario);

router.get("/editar-perfil",
autenticacaoMiddleware.validateJWT,
editarPerfilControllerRead.getPage);

router.post("/editar-perfil",
autenticacaoMiddleware.validateJWT,
upload.single("foto_perfil"),
regrasValidacaoMiddleware.editarPerfilValidationRules,
validacaoFormulariosMiddleware.editarPerfilValidation,
editarPerfilControllerUpdate.editUser);

router.get("/perfil-profissional",
autenticacaoMiddleware.validateJWTProfissional,
homePerfilProfissionalControllerRead.returnPage);

router.get("/perfil-profissional/:perfissionalId",
autenticacaoMiddleware.validateJWT,
perfilProfissionalPacienteControllerRead.returnPage);

router.get("/editar-perfil-profissional",
autenticacaoMiddleware.validateJWTProfissional,
editarPerfilProfissionalControllerRead.getPage);

router.get("/deletar-perfil-profissional",
autenticacaoMiddleware.validateJWTProfissional,
deletarPerfilProfissionalControllerDelete.deletarProfissional);

router.post("/editar-perfil-profissional/:userId",
autenticacaoMiddleware.validateJWTProfissional,
upload.single("foto_perfil"),
regrasValidacaoMiddleware.editarProfissionalValidationRules,
validacaoFormulariosMiddleware.validacaoEditarProfissional,
editarPerfilProfissionalControllerUpdate.editUser);

router.post("/cadastrar-desabafo",
autenticacaoMiddleware.validateJWT,
regrasValidacaoMiddleware.desabafoValidationRules,
validacaoFormulariosMiddleware.validacaoDesabafo,
cadastroDesabafoControllerRead.cadastrarDesabafo);

router.get("/cadastrar-desabafo",
autenticacaoMiddleware.validateJWT,
indexControllerRead.returnPage);

router.get("/images/fotos/:userId",
imagemPerfilPacienteControllerRead.getImage);

router.get("/images/fotos/rodas-de-conversa/:rodaDeConversaId",
imagemCapaRodasDeConversaControllerRead.getImage);

router.get("/images/fotos/profissionais/:userId",
imagemPerfilProfissionalControllerRead.getImage);

router.get("/home-admin",
autenticacaoMiddleware.validateTokenAdmin,
homeAdminControllerRead.returnPage);

router.get("/profissionais-admin",
autenticacaoMiddleware.validateTokenAdmin,
profissionaisAdminControllerRead.returnPage);

router.get("/editar-usuario-admin/:userId",
autenticacaoMiddleware.validateTokenAdmin,
editarUsuarioAdminControllerRead.getPage);

router.post("/editar-usuario-admin/:userId",
autenticacaoMiddleware.validateTokenAdmin,
upload.single("foto_perfil"),
regrasValidacaoMiddleware.editarPerfilValidationRules,
validacaoFormulariosMiddleware.editarUsuarioAdminValidation,
editarUsuarioAdminControllerUpdate.editUser);

router.get("/editar-profissional-admin/:userId",
autenticacaoMiddleware.validateTokenAdmin,
editarProfissionalAdminControllerRead.getPage);

router.post("/editar-profissional-admin/:userId",
autenticacaoMiddleware.validateTokenAdmin,
upload.single("foto_perfil"),
regrasValidacaoMiddleware.editarProfissionalValidationRules,
validacaoFormulariosMiddleware.validacaoEditarProfissionalAdmin,
editarProfissionalAdminControllerUpdate.editUser);

router.get("/deletar-usuario-admin/:userId",
autenticacaoMiddleware.validateTokenAdmin,
deletarUsuarioAdminControllerDelete.deletarUsuario);

router.get("/deletar-profissional-admin/:userId",
autenticacaoMiddleware.validateTokenAdmin,
deletarProfissionalAdminControllerDelete.deletarUsuario);

router.get("/rodas-de-conversa-admin",
autenticacaoMiddleware.validateTokenAdmin,
rodasDeConversaAdminControllerRead.returnPage);

router.get("/criar-roda-de-conversa-admin",
autenticacaoMiddleware.validateTokenAdmin,
criarRodaDeConversaAdminControllerRead.returnPage);

router.post("/criar-roda-de-conversa-admin",
autenticacaoMiddleware.validateTokenAdmin,
upload.single("foto_capa"),
regrasValidacaoMiddleware.rodaDeConversaValidationRules,
validacaoFormulariosMiddleware.validacaoCriarRodaDeConversa,
criarRodaDeConversaAdminControllerCreate.createRodaDeConversa);

router.get("/deletar-roda-de-conversa-admin/:rodaDeConversaId",
autenticacaoMiddleware.validateTokenAdmin,
deletarRodaDeConversaAdminControllerDelete.deletarRodaDeConversa);

router.get("/editar-roda-de-conversa-admin/:rodaDeConversaId",
autenticacaoMiddleware.validateTokenAdmin,
editarRodaDeConversaAdminControllerRead.returnPage);

router.post("/editar-roda-de-conversa-admin/:rodaDeConversaId",
autenticacaoMiddleware.validateTokenAdmin,
upload.single("foto_capa"),
regrasValidacaoMiddleware.rodaDeConversaValidationRules,
validacaoFormulariosMiddleware.validacaoEditarRodaDeConversa,
editarRodaDeConversaAdminControllerUpdate.editRodaDeConversa);

module.exports = router;