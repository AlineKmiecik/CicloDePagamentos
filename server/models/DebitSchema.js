const mongoose  = require("mongoose");

const debit = new mongoose.Schema({
    //nome : tipo
    name : {
        type: String, 
        required: [true, "O campo data do débito é obrigatório"],
    },
    
    value : {
        type: Number,
        min: [0, 'Valor mínimo de R$ 1,00'],
        required: [true, "O campo valor do débito pe obrigatório"],
    },
    
    status:{
        type: String,
        required: [true, "O campo status do débito é obrigatório"],
        uppercase: true, 
        enum: ["PAGO", "PENDENTE", "AGENDADO"],
    },

});

module.exports = debit;