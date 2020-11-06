//ARQ RESPONSÁVEL POR FAZER A ADM/CONFIG DA DATABASE

//IMPORTAÇÃO DO MÓDULO MONGOOSE -> EQUIVALENTE AO ENTITY FRAMEWORK
const mongoose = require("mongoose");


// A string de conecção vem do mongoDb (do cluster criado)
const db = mongoose.connect("mongodb+srv://AlineKmiecik:Hadouken81810190@ciclodepagamentos.sihcn.gcp.mongodb.net/CicloDePagamentos?retryWrites=true&w=majority", {
    UseNewUrlParser: true,
    UseUnifiedTopology: true,
});


//mensagens de conecção
mongoose.connection.on("connected", () => {
    console.log("Conexão estabelecida com o DB");
});

mongoose.connection.on("disconnected", () => {
    console.log("desconectado com o DB");
});

mongoose.connection.on("error", (error) => {
    console.log(`Algum erro aconteceu com o banco \n ${error}`);
});

module.exports = db;