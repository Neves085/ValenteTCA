const {Router} = require("express");
const router = Router();

const indexControllerRead = require("../controllers/indexControllerRead");
const agendamentoControllerRead = require("../controllers/agendamentoController/agendamentoControllerRead");
const perfilControllerRead = require("../controllers/perfilController/perfilControllerRead");
const privacidadeControllerRead = require("../controllers/privacidadeController/privacidadeControllerRead");
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


const deletaController = require('../controllers/perfilController/perfilControllerDeletar'); 

router.get("/", indexControllerRead.returnPage);

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


module.exports = router;