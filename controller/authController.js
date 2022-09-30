const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const passport = require("passport");
const { raw } = require("body-parser");


module.exports = class AuthController {


  static login(req, res) {
    res.render("auth/login");
  }

  static async loginPost(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res, next);
  }

  static  registrar(req, res) {
    var permissoes = {
      perfilSolicitante: res.locals.user.perfilSolicitante, perfilEntregador: res.locals.user.perfilEntregador,
      perfilAdmin: res.locals.user.perfilAdmin, email: res.locals.user.email, name: res.locals.user.name
  }
    return res.render("auth/registrar", {permissoes:permissoes})
  }

  static async registrarPost(req, res) {
    var { name, email, password, confirmpassword, perfilSolicitante, perfilEntregador, perfilAdmin } = req.body;

    if (password != confirmpassword) {
      res
        .status(400)
        .json({ message: "As senhas não conferem, tente novamente !" });
      return;
    }

    if (password.length < 6) {
      res.status(411).json({ message: "Senha muito fraca !" });
      return;
    }

    var checkUser = await Usuario.findOne({ where: { email: email } });

    if (checkUser) {
      res.status(400).json({ message: "O E-mail já está em uso !" });
      return;
    }

    var salt = bcryptjs.genSaltSync(10);
    var hashedPassword = bcryptjs.hashSync(password, salt);

    var usuario = {
      name,
      email,
      password: hashedPassword,
      perfilSolicitante,
      perfilEntregador,
      perfilAdmin
    };
    console.log("PERFIL ENTREGADOR",perfilEntregador)
    console.log("PERFIL SOLICITANTE",perfilSolicitante)
    console.log("PERFIL ADMIN",perfilAdmin)

    try {
          await Usuario.create(usuario);
          res.status(200).json({ message: "Cadastro realizado com sucesso !" });
          return; 
    } catch (error) {
      console.log(error);
    }
  }

  static async listaUsuario(req, res) {

    var permissoes = {
      perfilSolicitante: res.locals.user.perfilSolicitante, perfilEntregador: res.locals.user.perfilEntregador,
      perfilAdmin: res.locals.user.perfilAdmin, email: res.locals.user.email, name: res.locals.user.name
  }
   
    var usuarios = await Usuario.findAll({ raw: true });

    res.render("auth/listaUsuarios", { usuarios: usuarios, permissoes: permissoes })
  }

  static async editarUsuario(req, res) {
    var permissoes = {
      perfilSolicitante: res.locals.user.perfilSolicitante, perfilEntregador: res.locals.user.perfilEntregador,
      perfilAdmin: res.locals.user.perfilAdmin, email: res.locals.user.email, name: res.locals.user.name
  }
  var usuario = await Usuario.findOne({
      where: { id: req.params.id },
      raw: true,  
    });
    res.render("auth/editarUsuario", { usuario: usuario, permissoes:permissoes })
} 

  static async editarUsuarioPost(req, res) {
    var { name, email, perfilSolicitante,
      perfilEntregador,
      perfilAdmin } = req.body;

      var usuario = { name,
       email,
       perfilSolicitante,
      perfilEntregador,
      perfilAdmin
      };

    try {
        await Usuario.update(usuario, {where: {id: req.params.id}});
          res.status(200).json({ message: "Usuario atualizado com sucesso !" });
          return; 
    } catch (error) {
      console.log(error);
    }
  }

  static async editarSenha(req, res) {
    var permissoes = {
      perfilSolicitante: res.locals.user.perfilSolicitante, perfilEntregador: res.locals.user.perfilEntregador,
      perfilAdmin: res.locals.user.perfilAdmin, email: res.locals.user.email, name: res.locals.user.name
  }
  var usuario = await Usuario.findOne({
      where: { id: req.params.id },
      raw: true,
    });
    res.render("auth/editarSenha", { usuario: usuario, permissoes: permissoes })
  } 

  static async editarSenhaPost(req, res) {

    var {password, confirmpassword } = req.body;

    if (password != confirmpassword) {
      res.status(400).json({ message: "As senhas não conferem, tente novamente !" });
      return;
    }

    if (password.length < 6) {
      res.status(411).json({ message: "Senha muito fraca !" });
      return;
    }

    var salt = bcryptjs.genSaltSync(10);
    var hashedPassword = bcryptjs.hashSync(password, salt);

    var usuario = {
      password: hashedPassword,
    };

    try {
      await Usuario.update(usuario, {where: {id: req.params.id}});

      res.status(200).json({ message: "Atualização realizada com sucesso !" });
      return;
    } catch (error) {
      console.log(error);
    }}

  static async deletarUsuario(req, res) {
    try {
      await Usuario.destroy({ where: { id: req.params.id } });

      req.flash("success_msg", "Usuário apagado com sucesso !")
      res.redirect('/listaUsuarios')
      
    } catch (error) {
      req.flash("error_msg", "Não foi possivel apagar o usuário! !")
      res.redirect('/listaUsuarios')
    }
  }
  
  static logout(req, res) {
    req.logout(req.user, (err) => {
      if (err) return next(err);
      req.flash("success_msg", "Deslogado com sucesso!");
      res.redirect("/login");
    });
  }

}