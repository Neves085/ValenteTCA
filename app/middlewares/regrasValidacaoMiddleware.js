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

    desabafoValidationRules: [
        body("desabafo")
        .trim()
        .isLength({min: 3})
        .withMessage("Por favor escreva pelo menos 3 caracteres.")
    ],
}



module.exports = regrasValidacao;