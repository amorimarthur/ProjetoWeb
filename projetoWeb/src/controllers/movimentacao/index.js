const ContaCorrente = require('../../models/contaCorrente');
const Movimentacao = require('../../models/movimentacao');
const uuid = require('uuid');

function fazerMovimentacao(req, res) {
  const contaCorrenteId = req.params.id;
  const tipoMovimentacao = req.body.tipoMovimentacao;
  const contaDestino = req.body.contaDestino;
  const observacao = req.body.observacao;
  const valor = parseFloat(req.body.valor);
 

  // Encontrar a conta corrente pelo ID
  ContaCorrente.findByPk(contaCorrenteId)
    .then((contaCorrente) => {
      if (!contaCorrente) {
        // Conta corrente não encontrada
        res.render("movimentacao/erro.ejs", { mensagem: "Conta corrente não encontrada" });
        return;
      }

      if (tipoMovimentacao === 'C') {
        // Verificar se o saldo é suficiente para a movimentação de débito
        if (contaCorrente.saldo < valor) {
          res.render("movimentacao/erro.ejs", { mensagem: "Saldo insuficiente" });
          return;
        }

        // Subtrair o valor do saldo
        contaCorrente.saldo -= valor;
      } else if (tipoMovimentacao === 'D') {
        // Adicionar o valor ao saldo
        contaCorrente.saldo += valor;
      } else {
        // Tipo de movimentação inválido
        res.render("movimentacao/erro.ejs", { mensagem: "Tipo de movimentação inválido" });
        return;
      }
      Movimentacao.create({
        id: String(uuid.v4()),
        observacao:observacao,
        contaOrigem: contaCorrente.numero,
        contaDestino: contaDestino,
        dataMovimento: new Date().toDateString(),
        valor: valor,
        tipo: tipoMovimentacao,
        contaCorrenteId: contaCorrente.id
      })
        .then((movimentacao) => {
          // Salvar as alterações na conta corrente
          contaCorrente.save()
          .then(() => {
            res.render("movimentacao/extrato.ejs", { movimentacao });
          })
          .catch((err) => {
            console.log(err);
            res.render("movimentacao/erro.ejs", { mensagem: "Ocorreu um erro ao salvar a movimentação" });
          });
        })
        .catch((err) => {
          console.log(err);
          res.render("movimentacao/erro.ejs", { mensagem: "Ocorreu um erro ao criar a movimentação" });
        });

     
    })
    .catch((err) => {
      console.log(err);
      res.render("movimentacao/erro.ejs", { mensagem: "Ocorreu um erro ao buscar a conta corrente" });
    });
}

function fazerMovimentacaoView(req, res) {
  res.render("movimentacao/index.ejs", {contaCorrenteId:req.body.contaCorrenteId});
}

module.exports = {
  fazerMovimentacao,
  fazerMovimentacaoView
};
