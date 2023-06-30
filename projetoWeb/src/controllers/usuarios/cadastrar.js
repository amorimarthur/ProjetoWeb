const Pessoa = require('../../models/usuario');
const uuid = require('uuid');

async function cadastrarUsuario(req, res) {
  const { email, senha, pessoaId } = req.body;

  try {
    // Verificar se o email já existe no banco de dados
    const pessoaExistente = await Pessoa.findOne({ where: { email } });
    if (pessoaExistente) {
      // Email já cadastrado
      res.render("usuario/logar-usuario.ejs", { mensagem: "A pessoa já possui cadastro." });
      return;
    }

    // Criar o registro do usuário
    const pessoa = {
      id: uuid.v4(),
      email,
      senha,
      pessoaId
    };

    await Pessoa.create(pessoa);
    res.render("usuario/logar-usuario.ejs");
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}

module.exports = {
  cadastrarUsuario
};
