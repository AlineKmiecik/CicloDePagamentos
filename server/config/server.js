//ARQUIVO COM AS CONFIGURAÇÕES DO SERVIDOR

'use strict'

//declarar as dependências do arquivo (necessidade de bibliotecas - express e body-parser)
const express = require('express'); //não precisa colocar "./" pois ele procura direto no node_modules


//faz as converções necessárias para lidar com os dados que são recebidos por meio de requisições em json 
const bodyParser = require("body-parser");

//para ter acesso ao que foi definido no arquivo de rotas
const routes = require("./routes.js");

const cors = require("cors");

//aplicação do servidor recebe o express
const app = express();

app.use(cors());

//configurar a conversão das informações que chegam em uma requisição(para que nao tenha que ser feita na mão)
//DEVE FICAR ANTES DAS CONFIGURAÇÕES DE ROTAS, POIS DAÍ AS INFORMAÇÕES SÃO ENVIADAS JÁ CONVERSTIDAS 
app.use(bodyParser.json());

//converte quando for um formulário
app.use(bodyParser.urlencoded({extended: true}));

//CONFIGURAR ARQUIVO DE ROTAS 
    //para qualquer requisição que chegue na raiz ele vai para mandar para o arquivo de rotas ver o que deve ser feito
    // é n o arquivo routes que contêm as configurações de rotas, o servidor apenas encaminha para o arquivo de configuração
app.use("/", routes);


//DEFINIR A PORTA QUE O SERVIDOR VAI ESCUTAR
const port = 1234;

//configurando o servidor para escutar uma porta definida (subir o servidor)
//parametros (porta que será escutada, função - function() {} )
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})
