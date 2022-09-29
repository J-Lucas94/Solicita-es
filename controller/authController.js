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

  static async registrar(req, res) {
    var permissoes = {
      perfilSolicitante: res.locals.user.perfilSolicitante, perfilEntregador: res.locals.user.perfilEntregador,
      perfilAdmin: res.locals.user.perfilAdmin
  }
    if(req.params.id){
    var usuario = await Usuario.findOne({
      where: { id: req.params.id },
      raw: true
    })
  }
  return res.render("auth/registrar", {usuario:usuario, permissoes: permissoes})
    
  }

  static async registrarPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

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

    

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
        if(req.body.hiddenId == ""){
          const createUser = await Usuario.create(user);
          res.status(200).json({ message: "Cadastro realizado com sucesso !" });
          return;
        }else{
         
       await Usuario.update(user, {where: {id: req.body.hiddenId}});

      res.status(201).json({ message: "Atualização realizada com sucesso !" });
      return;
        }

    } catch (error) {
      console.log(error);
    }
  }

  static async listaUsuario(req, res) {
    var usuarios = await Usuario.findAll({ raw: true })
    res.render('auth/listaUsuarios', { usuarios: usuarios })
  }


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