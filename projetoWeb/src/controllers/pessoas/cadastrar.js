const Pessoa = require('../../models/pessoa')
const uuid = require('uuid');

function cadastrarPessoa(req, res){
    let pessoa = {
        id: String(uuid.v4()),
        nome: req.body.nome,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        endereco: req.body.endereco,
        cep: req.body.cep,
    }
    
    Pessoa.create(pessoa).then((result)=>{
        res.render("usuario/cadastrar-usuario.ejs", {nome:pessoa.nome, pessoaId:pessoa.id});
    }).catch((err) => {
        console.log(err)
        res.json({err});
    })
}

module.exports =  {
    cadastrarPessoa,
};