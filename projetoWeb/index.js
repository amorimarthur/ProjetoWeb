const express = require('express')
const mustacheExpress = require('mustache-express')
const session = require('express-session')
const db = require('./src/db')

const app = express()

app.engine('html', mustacheExpress())
app.set('view engine', 'html')
app.set('views', __dirname + '/src/views')

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(session({
    secret: 'secret-token',
    name: 'sessionId',  
    resave: false,
    saveUninitialized: false
}))


//Rotas
app.use('/', require('./src/routes/pessoas'));
app.use('/', require('./src/routes/contaCorrente'));
// app.use('/', require('./src/routes/movimentacao'));
app.use('/', require('./src/routes'));

db.sync(() => console.log(`Banco de dados conectado`));

const app_port = 3333
app.listen(app_port, function () {
    console.log('app rodando na porta ' + app_port)
})