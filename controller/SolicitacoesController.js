const Solicitacoes = require('../models/Solicitacoes')

module.exports = class Solicitacoes{
    static async solicitacao (req, res){
        res.render('solicitacao/solicitacao')
    }
}