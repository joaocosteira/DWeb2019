var http = require('http')
var url = require('url')
var pug = require('pug')
var fs= require('fs')
var jsonfile = require('jsonfile')
var {parse} = require('querystring')
var myBD = "tarefas.json"
var port =5005

/*
    Servidor.
*/
var myServer = http.createServer((req,res)=>{

    var purl = url.parse(req.url,true)
    var query = purl.query 

    //print para obter os requests. Muito importante para o testes.
    console.log(req.method + ' ' + purl.pathname)


    if(req.method == 'GET'){

        //Tratamento da Main Page.
        if (purl.pathname === "/") {

        //Obter os ficheiros a.k.a "BD"
        jsonfile.readFile(myBD, (erro, tarefas) => {
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            if (!erro) {
                //Caso corra bem damos o index.
              res.write(pug.renderFile("index.pug", { lista: tarefas }));
            } else {
              res.write(pug.renderFile("erro.pug", { e: erro }));
            }
            res.end();
          });

        }
        //Get stylesheet
        else if (purl.pathname === "/w3.css") {
            res.writeHead(200, { "Content-Type": "text/css" });
            fs.readFile("stylesheets/w3.css", (erro, dados) => {
              if (!erro) {
                res.write(dados);
              } else {
                res.write(pug.renderFile("erro.pug", { e: erro }));
              }
              res.end();
            });
          }
    }
    else if (req.method === "POST") {
        //Adicionar uma tarefa
        if (purl.pathname === "/adicionartarefa") {
            recuperaInfo(req, resultado => {
                jsonfile.readFile(myBD, (erro, tarefas) => {
                    //Escrever os dados em ficheiro
                    if (!erro) {
                      tarefas.push(resultado);
                      jsonfile.writeFile(myBD, tarefas, erro => {
                        if (erro) {
                          console.log(erro);
                        } else {
                          res.writeHead(302, {
                            Location: "/"
                          });
                          res.end();
                        }
                      });
                    }
                  });
               
               
            })


        }
    }    
})

myServer.listen(port,()=>{
    console.log("Servidor à escuta na porta " + port +"...")
})

//Funcao feita na aula.
function recuperaInfo(request,callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data',bloco=>{
            body += bloco.toString()
        })
        request.on('end', ()=>{
            callback(parse(body))
        })
    }
}

