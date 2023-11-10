const { body } = require("express-validator");

const regrasValidacao = {
    cadastroValidationRules: [
        body("nome")
        .trim()
        .isLength({min: 3, max: 255})
        .withMessage("Insira seu nome completo!"),
        body("email")
        .isEmail()
        .withMessage("Insira seu email completo!"),
        body("telefone")
        .isLength({min: 11, max: 11})
        .withMessage("Insira seu número de telefone! (Apenas números)"),
        body("senha")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage("Use uma senha forte com números, letras (maiúsculas e minúsculas), e símbolos (!, $, %, ...). Mínimo de 8 caracteres.")
    ],

    cadastroProfissionalValidationRules: [
        body("nome")
        .trim()
        .isLength({min: 3, max: 255})
        .withMessage("Insira seu nome completo!"),
        body("email")
        .isEmail()
        .withMessage("Insira seu email completo!"),
        body("telefone")
        .isLength({min: 11, max: 11})
        .withMessage("Insira seu número de telefone! (Apenas números!)"),
        body("cpf")
        .isInt()
        .withMessage("Insira apenas os números do seu CPF!")
        .isLength({min: 11, max: 11})
        .withMessage("Insire o seu CPF completo. (Apenas números!)"),
        body("senha")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .withMessage("Use uma senha forte com números, letras (maiúsculas e minúsculas), e símbolos (!, $, %, ...). Mínimo de 8 caracteres.")
    ],

    editarPerfilValidationRules: [
        body("nome")
        .trim()
        .isLength({min: 3, max: 255})
        .withMessage("Insira seu nome completo!"),
        body("email")
        .isEmail()
        .withMessage("Insira seu email completo!"),
        body("telefone")
        .trim()
        .isLength({min: 11, max: 11})
        .withMessage("Insira seu número de telefone! (Apenas números)"),
        body("descricao")
        .optional({values: "falsy"})
        .trim()
        .isLength({min: 3})
        .withMessage("Sua descrição deve ter pelo menos 3 caracteres!")
        .isLength({max: 255})
        .withMessage("Sua descrição não pode ter mais de 255 caracteres!")
    ],

    editarProfissionalValidationRules: [
        body("nome")
        .trim()
        .isLength({min: 3, max: 255})
        .withMessage("Insira seu nome completo!"),
        body("email")
        .isEmail()
        .withMessage("Insira seu email completo!"),
        body("telefone")
        .isLength({min: 11, max: 11})
        .withMessage("Insira seu número de telefone! (Apenas números!)"),
        body("cpf")
        .isInt()
        .withMessage("Insira apenas os números do seu CPF!")
        .isLength({min: 11, max: 11})
        .withMessage("Insire o seu CPF completo. (Apenas números!)"),
        body("descricao")
        .optional({values: "falsy"})
        .trim()
        .isLength({min: 3})
        .withMessage("Sua descrição deve ter pelo menos 3 caracteres!")
        .isLength({max: 255})
        .withMessage("Sua descrição não pode ter mais de 255 caracteres!")
    ],

    desabafoValidationRules: [
        body("desabafo")
        .trim()
        .isLength({min: 3})
        .withMessage("Por favor escreva pelo menos 3 caracteres.")
    ],

    rodaDeConversaValidationRules: [
        body("nome")
        .trim()
        .isLength({min: 3})
        .withMessage("O nome da roda de conversa deve ter no mínimo 3 caracteres!")
        .isLength({max: 150})
        .withMessage("O nome da roda de conversa deve ter no máximo 150 caracteres!")
    ],

    sessaoValidationRules: [
        body("nome")
        .isLength({min: 3})
        .withMessage("O nome da sessão deve ter no mínimo 3 caracteres!")
        .isLength({max: 150})
        .withMessage("O nome da sessão não deve ultrapassar os 150 caracteres!"),
        body("data_reuniao")
        .isLength({min: 10, max: 10})
        .withMessage("Insira sua data de nascimento no padrão DD/MM/YYYY")
        .matches(/^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/)
        .withMessage("Insira sua data de nascimento no padrão DD/MM/YYYY"),
        body("quantidade_pessoas")
        .isInt({min: 2})
        .withMessage("A sua sala deve ter você e pelo menos mais uma pessoa!")
        .isInt({max: 12})
        .withMessage("A sua sala não deve ter mais de 12 pessoas contando com você!"),
        body("descricao")
        .isLength({min: 3})
        .withMessage("A descrição deve ter no minímo 3 caracteres!")
        .isLength({max: 255})
        .withMessage("A descrição deve ter no minímo 255 caracteres!"),
        body("link_reuniao")
        .isURL()
        .withMessage("O link da reunião deve ser em formato URL!"),
    ]
}



module.exports = regrasValidacao;