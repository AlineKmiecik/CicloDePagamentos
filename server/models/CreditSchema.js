const mongoose  = require("mongoose");

const credit = new mongoose.Schema({
    //nome : tipo
    name : {
        type: String, 
        required: [true, "O campo data do crédito é obrigatório"],
    },

    value : {
        type: Number,
        min: [0, 'Valor mínimo de R$ 1,00'],
        required: [true, "O campo valor do crédito pe obrigatório"],
    }

});

module.exports = credit;