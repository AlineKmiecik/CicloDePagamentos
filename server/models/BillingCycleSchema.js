const mongoose  = require("mongoose");

const creditSchema = require("./CreditSchema.js");
const DebitSchema = require("./DebitSchema.js");

const billingCycleSchema = new mongoose.Schema({
    //nome : tipo
    date : {
        type: Date, 
        required: [true, "O campo data do ciclo de pagamento é obrigatório"],
        min: ["2015-01-01", "A data não pode ser inferior a 01/01/2015"],
        max: ["2050-01-01", "A data não pode ser maior do que 01/01/2015"],
    },
    credits: [creditSchema],
    debits: [DebitSchema],
    //Adiciona a data atual no registro
    createdAt: {type: Date, default:Date.now},
});

//O nome da coleção será "cycles"
module.exports = mongoose.model("Cycles", billingCycleSchema);