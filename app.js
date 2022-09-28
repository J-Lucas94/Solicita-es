const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors')

//passport
const passport = require('passport')
require("./config/auth")(passport)

// Session

const session = require('express-session')
const flash = require('connect-flash')

//config

app.use(session({
    secret: "332427",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//midleware



app.use((req, res, next) => {
    cors()
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
// console.log("app.use Usuario: ",req.user)
    res.locals.user = req.user || null
    res.locals.perfilSolicitante = req.perfilSolicitante || null
    next()
    
})
//bodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// handlebars template

const hbs = require('express-handlebars');
const { decodeBase64 } = require('bcryptjs');
app.engine("handlebars", hbs.engine({
    helpers: {
        ifStatus: (status) => {
            //console.log(status === "A")
            if (status === 1) {
                return 'checked'
            }
            return ''
        },
        ifGrupo: async(grupo, id_usuario) => {
            console.log(grupo)
            await grupoxusuarios.findOne({
                raw: true,
                where: { id_usuario: id_usuario, descricao: grupo }
            }).then(async(result) => {
                return await result.status === 1
            })
        },
        formatMoney: async(places, symbol, thousand, decimal) => {
            places = !isNaN(places = Math.abs(places)) ? places : 2;
            symbol = symbol !== undefined ? symbol : "$";
            thousand = thousand || ",";
            decimal = decimal || ".";
            var number = this,
                negative = number < 0 ? "-" : "",
                i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
            return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");

        },
        formatNumber: (number, cDecimal) => {
            if (number === null) {
                number = 0;
            }
            return number.format(cDecimal)
        },
        formatDate: (cDate) => {
            var cDateRet = new Date(cDate).toISOString().split('T')[0]

            return cDateRet
        },
        formatDate2: (cDate) => {
            var cDateRet = new Date(cDate).toLocaleDateString()

            return cDateRet
        }
    }
}));
app.set("view engine", "handlebars");

//Models

const Usuario = require('./models/Usuario')
const Solicitacao = require('./models/Solicitacoes')


//public path

app.use(express.static('public'))

//Routes

const authRoutes = require('./routes/authRoutes')
const solicitacoesRoutes = require('./routes/solicitacoesRoutes')

app.use('/', solicitacoesRoutes)
app.use('/', authRoutes)

//Conection

app.listen(3000, console.log('Iniciado na porta 3000'))