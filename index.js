const express = require("express");
const app = express();


app.set('view engine','ejs');
app.use(express.static('public'));

app.get("/:nome/:lang",(req, res) => {
    res.render("index");
});

app.get("/perguntar",(req, res) => {
    res.render("perguntar");

});

app.listen(8888,()=>{console.log("App rodando");});