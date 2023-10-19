const {Router} = require("express");
const router = Router();

const indexControllerRead = require("../controllers/indexControllerRead");

const agendamentoControllerRead = require("../controllers/agendamentoController/agendamentoControllerRead");

const perfilControllerRead = require("../controllers/perfilController/perfilControllerRead");

const privacidadeControllerRead = require("../controllers/privacidadeController/privacidadeControllerRead");
const termosControllerRead = require("../controllers/termosController/termosControllerRead");

const doacaoControllerRead = require("../controllers/doacaoController/doacaoControllerRead");

const profissionaisControllerRead = require("../controllers/profissionaisController/profissionaisControllerRead");

const rodaConversaControllerRead = require("../controllers/rodaConversaController/rodaConversaControllerRead");

const autenticacaoMiddleware = require("../middlewares/autenticacaoMiddleware");
const regrasValidacaoMiddleware = require("../middlewares/regrasValidacaoMiddleware");
const validacaoFormulariosMiddleware = require("../middlewares/validacaoFormulariosMiddleware");

const loginControllerRead = require("../controllers/loginController/loginControllerRead");
const loginControllerAuth = require("../controllers/loginController/loginControllerAuth");

const cadastroControllerRead = require("../controllers/cadastroController/cadastroControllerRead.js");
const cadastroControllerCreate = require("../controllers/cadastroController/cadastroControllerCreate");

const editarPerfilControllerRead = require("../controllers/perfilController/editarPerfilControllerRead");
const editarPerfilControllerUpdate = require("../controllers/perfilController/editarPerfilControllerUpdate");


const deletaController = require('../controllers/perfilController/perfilControllerDeletar'); 

router.get("/", indexControllerRead.returnPage);

router.get("/privacidade", privacidadeControllerRead.returnPage);

router.get("/termos", termosControllerRead.returnPage);

router.get("/perfil", perfilControllerRead.returnPage);

router.get("/agendamento", agendamentoControllerRead.returnPage);

router.get("/doacao", doacaoControllerRead.returnPage);

router.get("/profissionais", profissionaisControllerRead.returnPage);

router.delete("/delete", deletaController.deletarUsuario )

router.get("/rodas-de-conversa",
autenticacaoMiddleware.validateJWT,
rodaConversaControllerRead.returnPage);

router.get("/cadastro", cadastroControllerRead.returnPage);
router.post("/cadastro",
regrasValidacaoMiddleware.cadastroValidationRules,
validacaoFormulariosMiddleware.validacaoCadastro,
autenticacaoMiddleware.encriptarSenha,
cadastroControllerCreate.criarUsuario);

router.get("/login", loginControllerRead.returnPage);
router.post("/login",
validacaoFormulariosMiddleware.validacaoLogin,
loginControllerAuth.autorizarUsuario)

router.get("/editar-perfil",
autenticacaoMiddleware.validateJWT,
editarPerfilControllerRead.getPage);

router.post("/editar-perfil",
autenticacaoMiddleware.validateJWT,
validacaoRegrasMiddleware.editarPerfilValidationRules,
validacaoFormulariosMiddleware.editarPerfilValidation,
editarPerfilControllerUpdate.editUser);


module.exports = router;