const Solicitacao = require('../models/Solicitacoes')
module.exports = class Solicitacoes {

    static home(req, res){
       
        var permissoes = {
            perfilSolicitante: res.locals.user.perfilSolicitante, perfilEntregador: res.locals.user.perfilEntregador,
            perfilAdmin: res.locals.user.perfilAdmin, email: res.locals.user.email, name: res.locals.user.name
        }
        res.render('solicitacao/home', {permissoes:permissoes})
    }

    static async solicitacao(req, res) {
        try {

            if (req.params.numero) {
                var itens = await Solicitacao.findAll({ raw: true, where: { numero: req.params.numero } })

                var solicitante = await Solicitacao.findOne({ raw: true, where: { numero: req.params.numero } })

            }

        } catch (error) {
            console.log(error)
        }
        var permissoes = {
            perfilSolicitante: res.locals.user.perfilSolicitante, perfilEntregador: res.locals.user.perfilEntregador,
            perfilAdmin: res.locals.user.perfilAdmin, email: res.locals.user.email, name: res.locals.user.name
        }
        res.render('solicitacao/solicitacao', { solicitante: solicitante, itens: itens, permissoes:permissoes })
    }

    static async solicitacaoPost(req, res) {

        try {

            var solicitacao = req.body

            if (req.body.numero == "") {
                var proxNum = await Solicitacao.max('numero')
                console.log('Proximo numero ' + proxNum)
                if (proxNum == null) {
                    proxNum = 1
                } else {
                    proxNum = parseInt(proxNum) + 1
                }
                solicitacao.item = '1'
                solicitacao.numero = proxNum
                var numeroReq = await Solicitacao.create(solicitacao)
                res.json({ message: "sucesso", numero: proxNum })
            } else {
                if (req.body.item == "") {
                    var proxItem = await Solicitacao.max('item', { where: { numero: req.body.numero } })
                    // console.log('proximo item', parseInt(proxItem)+1)
                    solicitacao.item = parseInt(proxItem) + 1
                    await Solicitacao.create(solicitacao)
                } else {
                    await Solicitacao.update(solicitacao, {
                        where: {
                            numero: req.body.numero,
                            item: req.body.item
                        }
                    })
                }
                res.json({ message: "sucesso", numero: req.body.numero })
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async lista(req, res) {
        var permissoes = {
            perfilSolicitante: res.locals.user.perfilSolicitante, perfilEntregador: res.locals.user.perfilEntregador,
            perfilAdmin: res.locals.user.perfilAdmin, email: res.locals.user.email, name: res.locals.user.name
        }
        try {
            if (req.query.status == "pendentes") {
                console.log(req.query.status)
                var solicitacao = await Solicitacao.findAll({ raw: true, where: { data_entrega: '' } })
            } else {
                var solicitacao = await Solicitacao.findAll({ raw: true })
            }
        } catch (error) {
            console.log(error)
        }

        res.render('solicitacao/lista', { solicitacao: solicitacao, status: req.query.status, permissoes: permissoes })
    }
    static async itemGet(req, res) {
        try {
            console.log('numero: ', req.query.numero)
            console.log('item: ', req.query.item)
            var item = await Solicitacao.findOne({ raw: true, where: { numero: req.query.numero, item: req.query.item } })
            console.log(item)
            res.json(item)
        } catch (error) {

        }
    }

    static async removeItem(req, res) {
        var numero = req.params.numero
        var item = req.params.item

        if (numero && item) {
            await Solicitacao.destroy({ where: { numero: req.params.numero, item: req.params.item } })
            res.redirect("/solicitacao/" + req.params.numero)
        }
    }

    static async removeSolicitacao(req, res) {
        try {

            await Solicitacao.destroy({ where: { numero: req.params.numero } })
            res.redirect("/lista")
        } catch (error) {
            console.log(error)
        }
    }
}