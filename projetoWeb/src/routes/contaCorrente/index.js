const express = require('express');
const router = express.Router();

const contaCorrenteCadastroController = require('../../controllers/contaCorrente/cadastrar');
const contaCorrenteMovimentacaoController = require('../../controllers/movimentacao/index');


router.post('/contaCorrente/cadastrar', contaCorrenteCadastroController.cadastrarContaCorrente);

router.post('/contaCorrente/movimentacaoView', contaCorrenteMovimentacaoController.fazerMovimentacaoView);

router.post('/contaCorrente/movimentacao/:id', contaCorrenteMovimentacaoController.fazerMovimentacao);


module.exports = router;