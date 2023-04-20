// atividade feita por Mateus e Nicolas e o coadjuvante robson
// atv grande rsrs






//npm run dev
const express = require('express')
const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
const exp = require('constants')
const app = express()


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// front da pagina: html
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// pagina 1
app.get('/', (req, res, next) => {
  res.render('index');
})



//arquivo estatico: css, js
app.use(express.static(path.join(__dirname, 'public')))



//enviar para outra pagina via post e adicionar dados

app.post('/users', (req, res) => {
  // pega valor do input
  let nome = req.body.nome
  let email = req.body.email

  let dados = new Object()

  dados.name = nome
  dados.email = email
  // lê o json
    fs.readFile('data.json', 'utf8', (err, data) => {
    try {
      if (err) throw err
      // pega propriedade do arquivo JSON
      let json = JSON.parse(data)

      // transforma o valor que foi pego do input no formato JSON
      JSON.stringify(dados)

      
      // .users = objeto users dentro do data.json; 
      // .push = adiciona dados ao users
      json.users.push(dados)
      

      console.log(dados, '-- Dados enviados!')
      // escreve dados no json
      fs.writeFile(__dirname+'/data.json', JSON.stringify(json),(error, res) => {
        if(error){
            console.error(error)
             return
        }
      
         console.log(res)
      })
        
      
      
    } catch (err) {
      res.status(400).send({ error: err.message })
    }
    
    // pagina 2
    res.render('search')

  })
})
// fim da execucao da primeira pagina






// buscar por nome

app.get('/users/:name', (req, res) => {

// lê o arquivo json
  fs.readFile('data.json', 'utf8', (err, data) => {
    try {
      if (err) throw err
      const json = JSON.parse(data)
      // procura o parametro no json
      const getUserByName = json.users.find(
        (a) => a.name == req.params.name,
      )

      //console.log(getUserByName.name)

      if (getUserByName) {
        // res.send(getUserByName)
        // carrega outra pagina mostrando os parametros name e email
        res.render('result',{
          nome: getUserByName.name,
          email: getUserByName.email
        })

      } else {
        res.send("<h1>Error</h1>")
      }
    } catch (err) {
      res.status(400).send({ error: err.message })
    }
  })
})
// fim da execucao da segunda pagina



//servidor
app.listen(8727, () => {
  console.log("Servidor rodando na porta 3000")
})