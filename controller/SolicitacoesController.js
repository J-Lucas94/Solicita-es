const Solicitacao = require('../models/Solicitacoes')

module.exports = class Solicitacoes {
    static async solicitacao(req, res) {

        if (req.params.id) {

            var solicitacao = await Solicitacao.findOne({ raw: true, where: { id: req.params.id } })
        }
        res.render('solicitacao/solicitacao', { solicitacao: solicitacao })
    }

    static async solicitacaoPost(req, res) {

        try {

            var idSolicitacao 

            var solicitacao = req.body

            if(req.body.idSolicitacao == ""){
                
               idSolicitacao = await Solicitacao.create(solicitacao)

            }else{

               var confSolicitacao = await Solicitacao.findOne({where: {id: req.body.idSolicitacao}})

               if(confSolicitacao){
                idSolicitacao = req.body.idSolicitacao
                var solicitacao = await Solicitacao.update(solicitacao, {where: {id: req.body.idSolicitacao}})

               }else{
                return res.status(400).json({message: "Id não encontrado"})
               }

            }



        } catch (error) {
            console.log(error)
        }
    }

    static async lista(req, res) {
        try {
            var solicitacao = await Solicitacao.findAll({ raw: true })

        } catch (error) {
            console.log(error)
        }

        res.render('solicitacao/lista', { solicitacao: solicitacao })
    }
}