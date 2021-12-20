/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var bcrypt = require('bcryptjs');

module.exports = {
  /**
   * Alta de usuarios en el sistema
   * @param {*} req
   * @param {*} res
   */
  register: async function (req, res) {
    const params = req.allParams();
    console.log(params);
    /*
		const newUser = await User.create( params, function(err, user){
			if(err){
				console.log(err);
				var errores = null;

				if(err.invalidAttributes){
					errores = CustomErrors.getErrorsRegistro(err.invalidAttributes);
				}
				if(!err.invalidAttributes && err){
					errores = [];
					errores.push(err);
				}
				const paramsBack = {name:req.param('name'), surname: req.param('surname'), email: req.param('email')};
				req.session.flash = {errors: errores, params: paramsBack};
        return res.send(400, req.session.flash);
				// return res.redirect('/registro');
			}

			req.session.authenticated = true;
			req.session.User = user;
			// return res.redirect('/usuario/panel');
		}, { fetch: true });
*/
/*
    const newUser =  await User.create(params, function(err, user){
      if(err){
				console.log(err);
				var errores = null;

				if(err.invalidAttributes){
					errores = CustomErrors.getErrorsRegistro(err.invalidAttributes);
				}
				if(!err.invalidAttributes && err){
					errores = [];
					errores.push(err);
				}
				const paramsBack = {name:req.param('name'), surname: req.param('surname'), email: req.param('email')};
				req.session.flash = {errors: errores, params: paramsBack};
        return res.send(400, req.session.flash);
				// return res.redirect('/registro');
			}
    }, { fetch: true });
*/
    params.status = true;
    var newUser = await User.create(params)
    /*.intercept('E_UNIQUE', (err)=> {
      return 'emailAlreadyInUse';
    })*/
    .intercept((err)=>{
      console.error(err);
      // Return a modified error here (or a special exit signal)
      // and .create() will throw that instead
      // err.message = 'Uh oh: '+err.message;
      var errores = null;
      errores = [];
      errores.push(err);
      const paramsBack = {name:req.param('name'), surname: req.param('surname'), email: req.param('email')};
      req.session.flash = {errors: errores, params: paramsBack};
      return res.send(400, req.session.flash);
    })
    .fetch();
    return res.send(200, {newUser});
  },

  /**
   * Inicio de sesión de usuarios
   * @param {*} req
   * @param {*} res
   */
  login: async function (req, res) {
    const params = req.allParams();
    const user = await User.findOne({email: req.param('email')});
    if(!user) {
      return res.forbidden({err: 'User or password wrong'});
    }
    const result = bcrypt.compareSync(req.param('password'), user.password);
    if(result) {
      //password is a match
      return res.json({
            user:user,
            token: jwToken.sign(user) //generate the token and send it in the response
        });
    } else {
      //password is not a match
      return res.forbidden({err: 'Email and password combination do not match'});
    }
  },

  check: function(req, res) {
    return res.json();
  },

  /**
   * Cerrar sessión de ususarios
   * @param {*} req
   * @param {*} res
   */
  logout: function (req, res) {

  }

};

