// initialisation du server express 
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");

// gestion des fichiers static 
app.use(express.static(__dirname + "/dist"));

// gestion du chemin 
app.get("/*", (req, res)=>{
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port);
console.log('app ecoute sur le port :' + port);