const express = require('express');
const router = express.Router();

const pessoaController = require('../../controllers/pessoas/cadastrar');
const usuariosControllerCadastrar = require('../../controllers/usuarios/cadastrar');
const usuariosControllerLogar = require('../../controllers/usuarios/logar');

router.post('/pessoa/cadastrar', pessoaController.cadastrarPessoa);

// Usuarios
router.post('/usuario/cadastrar-usuario', usuariosControllerCadastrar.cadastrarUsuario);
router.post('/usuario/login', usuariosControllerLogar.logarUsuario);
router.get('/usuario/login', usuariosControllerLogar.logarUsuarioView);

module.exports = router;