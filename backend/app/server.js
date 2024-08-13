const express = require ('express')
const mysql = require('mysql2');
const app = express()
const port = 3000

var cors = require ('cors');
app.use(express.static("public"));
app.use(cors());

app.use(express.json())

const db = {
    host : '54.173.126.116',
    port : 3306,
    user : 'tet-clibot',
    password : 'clibotet',
    database : 'tet-clibot'
}

const execSQLQuery = (sqlQry, id, res) => {
  const connection = mysql.createConnection(db);
  connection.query(sqlQry, id, (error, results, fields) => {
    if(error)
      res.json(error);
    else
      res.json(results);
    
      connection.end();
      console.log('Executou: execSQLQuery');
  });
}

async function resultSQLQuery(sqlQry, id) {
  const connection = await mysql.createConnection(db);
  
  let [result] = await connection.promise().query(sqlQry, id);
  try {
    return result;
  } catch (error) {
    console.log("Erro: "+error);
  throw error;
  }
}

app.get('/', (req, res) =>{
    console.log("FUNCIONANDO")
    res.send('Hello World!')
})



app.put('/update/:id', (req,res)=>{
    const id = [req.body.cpf, req.body.fk_plano_saude_id_plano_saude, req.body.nome, req.body.telefone, req.body.email, req.body.endereco];
    execSQLQuery('UPDATE usuario SET cpf=?,fk_plano_saude_id_plano_saude=?,nome=?,telefone=?,email=?, endereco=? WHERE cpf=?', id, res);
})

app.delete('/delete/:id', (req,res)=>{
  const id = [req.params.id];
  execSQLQuery('DELETE FROM paciente WHERE cpf=?',id,res);
})

app.get('/usuesp/:id', (req,res)=>{
  const id=[req.params.id];
  execSQLQuery('SELECT * FROM paciente WHERE cpf=?',id,res);
})



app.get('/usuarios', (req, res) =>{
    const id = []
    execSQLQuery("SELECT * from paciente", id, res)
})

app.post('/usuario', (req, res) =>{
    const id = [req.body.cpf, req.body.fk_plano_saude_id_plano_saude, req.body.nome, req.body.telefone, req.body.email, req.body.endereco]
    execSQLQuery("INSERT INTO paciente VALUES (?,?,?,?,?,?)", id, res)
})

app.post('/login', async (req,res)=>{
  const id = [req.body.cpf, req.body.email];
  let [result] = await resultSQLQuery('SELECT * FROM paciente WHERE cpf=? and email=?',id);
  if(result)
    res.json({"mensagem": "Olá, seja bem vindo "+result.nome, "id": result.cpf})
  else
    res.json({"mensagem":"Usuário Inválido"})

})

app.listen(port, () => {
    console.log(`App escutando a porta: ${port} `)
})
