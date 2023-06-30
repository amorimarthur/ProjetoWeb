const ContaCorrente = require('../../models/contaCorrente');
const uuid = require('uuid');

function cadastrarContaCorrente(req, res) {
  const { numero, usuarioId } = req.body;
  console.log("UserIDD",usuarioId);

  ContaCorrente.create({
    id:String(uuid.v4()),
    numero,
    usuarioId: String(usuarioId)
  })
    .then((contaCorrente) => {

      res.render("contaCorrente/index.ejs", { contaCorrente });
    })
    .catch((err) => {
      console.log(err);
      res.json({ err });
    });
}

module.exports = {
  cadastrarContaCorrente
};
