const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//database
connection.
    authenticate()
    .then(() => {
        console.log("sucesso");
    })
    
    .catch((msgerro) => {
        console.log(msgerro)
    
})


//Estou dizendo para o express usar o EJS como view engine
app.set('view engine','ejs');
app.use(express.static('public'));

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.get("/",(req, res) => {
    Pergunta.findAll({ raw: true, order:[
        ['id','DESC'] //ASC = crescente || DESC = decrescente
    ]}).then(perguntas => { //raw : true (lista só as perguntas) //pesquisando pelas perguntas
        res.render("index", { //mando ela para o front end
            perguntas: perguntas
        });


    });
    //SELECT ALL PERGUNTAS
    
});

app.get("/perguntar",(req, res) => {
    res.render("perguntar");


});

app.post("/salvarpergunta",(req, res)=> {

    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    
    Pergunta.create({
        titulo: titulo,
        descricao: descricao

    }).then(() => {
        res.redirect("/");

    });

});

app.get("/pergunta/:id",(req, res) => { //localizando a pergunta pela URL
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ //Pergunta encontrada
            
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id','DESC']]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
            });

            });
        }else{
            res.redirect("/");
        }
        
        });
    })

  app.post("/responder",(req, res) =>{
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" +perguntaId);


    });




  });

app.listen(8888,()=>{console.log("App rodando");});


//criar parametro no express ':'