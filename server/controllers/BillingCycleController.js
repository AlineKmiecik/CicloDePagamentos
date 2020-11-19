//CLASSE RESPONSÁVEL POR COTNER AS ACTIONS (ações que serão requisitadas)

const billingCycle = require("../models/BillingCycleSchema.js");
const BillingCycleSchema = require("../models/BillingCycleSchema.js");

class billingCycleController {
    //método para armazenar 
    // não precisa escrever o "function"
    async store(req, res) {
        //quando chegar uma requisição na raiz, ele pega o corpo da req. (req.body) e mandava cadastrar 
        //O create é executado de forma assincrona (é indeterminado o tempo de execução)
        //O javaScript não espera o create ser executado pela biblioteca do mongoose e gerar um retorno, passando para a linha de comando de baixo
        //por consequencia o "result" fica vazio
        //O await faz com que o JavaScript espere um retorno para então continuar a executar a aplicação 
        //como o método possui função assincrona (await) deve ser colocado o async nos parametros do método
        
        try{
            var result = await billingCycle.create(req.body);
            //printa pra ver se está recebendo algo
            console.log(req.body);
            //retorna se está salvando no banco mesmo 
            res.status(201).json(result);
        }catch(error) {

            //para que a exceção não seja mais mostrada no console, mas sim no retorno
            res.status(500).json(error)
        }
    }

    async getByMonthYear(req, res){
        let year = Number(req.params.year);
        let month = Number(req.params.month);
        let cycles = await billingCycle.find({}).sort({ date: -1 });
        for (let cycle of cycles) {
          if (cycle.date.getFullYear() === year && cycle.date.getMonth() === month) {
            return res.status(200).json( cycle);
          }
        }
        return res.status(404);
      }

    async get(req, res){
        var result = await billingCycle.find({});
        res.status(200).json(result);
    
    }

    async getById(req, res){
        
        //puxar pelo Id 
        var result = await billingCycle.findById(req.params.cycleId) ;
        res.status(200).json(result); 
    }

    async delete(req, res){
        await billingCycle.deleteOne({_id: req.params.cycleId});
        var result = await billingCycle.find({});
        res.status(200).jason(result);
    }

    async deleteAll(req, res){
        var result = await billingCycle.deleteAll();
        res.status(200).json(result);
    }

    async update(req, res){
        let cycle = req.body;
        var result = await billingCycle.updateOne({_id: cycle._id}, cycle);
        res.status(200).json(result);
    }

    
}


//sempre deve exportar para quando precisar acessar as coisas da classe (para que nao fique private)
//por se tratar de uma classe deve exportar criando um novo objeto (intanciando);
module.exports = new billingCycleController();