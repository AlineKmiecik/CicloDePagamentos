//\ARQUIVO COM AS CONFIGURAÇÕES DE ROTAS DA APLICAÇÃO
//APENAS DEVE DIZER SE RECEBEU X VA PARA Y

//É DEFINIDO NO SERVIDOR O QUE DEVER SER FEITO QUANDO CHEGAR UMA REQUISIÇÃO

const express = require('express');
const router = express.Router();    

const billingCycleController = require("../controllers/BillingCycleController.js"); 


//para dar respostas ao usuário
//
router.get("/", billingCycleController.get);

//RECEBENDO PARAMETRO NA ROTA E BUSCAR POR UM ID, NOME...
// ": NOME DO PARAMETRO DESEJADO"
router.get("/:cycleId", billingCycleController.getById);


//QUANDO CHEGAR UMA REQUISIÇÃO NA RAIZ, CHAMARÁ O MÉTODO "STORE" DE BillingCyclesController.js
//SE FOSSE billingCycleController.store(), COM OS "()", ASSIM QUE PASSASSE POR AQUI JÁ CHAMARIA O MÉTODO STORE
//NÃO FICA CONFIGURADO PARA QUANDO CHAMAR UM POST CHAMAR O STORE, POR ISSO DEIXAR SEM OS "()"
//SEM OS PARENTESES, APENAS SE A REQUISIÇÃO FOR FEITA NA RAIZ ELE CHAMARÁ O MÉTODO "STORE"
router.post("/",billingCycleController.store);




//exportar o router pois ele será necessário em outros lugares como no servidor
module.exports = router ;
