const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db', //nome do container
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql');
const connection = mysql.createConnection(config);

const query1 = `INSERT INTO people(name) values ('Luiz')`;
connection.query(query1);

let html = "<h1>Full Cycle Rocks!</h1><br/>";
connection.query('SELECT id, name FROM people', function (error, results, fields) {
    if (error) throw error;

    results.forEach(result => {
        html += `<li>#${result.id} - ${result.name}</li>`
    });

  });
connection.end();

app.get('/', (req, res) => {    
    res.send(`${html}`); 
});

app.listen(port, ()=>{
    console.log("Rodando na porta "+port)
});