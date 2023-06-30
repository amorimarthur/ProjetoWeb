const Pessoa = require('../../models/usuario');
const { exibirContaCorrente } = require('../../controllers/contaCorrente/exibirContaCorrente');

function logarUsuario(req, res) {
  const email = req.body.email;
  const senha = req.body.senha;

  Pessoa.findOne({
    where: {
      email,
      senha
    }
  })  
    .then((usuario) => {
      if (usuario) {
        exibirContaCorrente(req, res, usuario);
      } else {
        res.render("usuario/erro-login.html");
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ err });
    });
}


function logarUsuarioView(req, res) {
  res.render("usuario/logar-usuario.ejs");
}

module.exports = {
  logarUsuario,
  logarUsuarioView
};
