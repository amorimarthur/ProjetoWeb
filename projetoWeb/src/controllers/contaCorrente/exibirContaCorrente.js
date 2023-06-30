const ContaCorrente = require('../../models/contaCorrente');

function exibirContaCorrente(req, res, usuario) {
  const usuarioId = usuario.id

  ContaCorrente.findOne({ where: { usuarioId } })
    .then((contaCorrente) => {
      if (contaCorrente) {
        res.render("contaCorrente/index.ejs", { contaCorrente });
      } else {
        res.render("usuario/sem-conta-corrente.ejs", {usuarioId:usuario.id});
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ err });
    });
}

module.exports = {
  exibirContaCorrente,
};
