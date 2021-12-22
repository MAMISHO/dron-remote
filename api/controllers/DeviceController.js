/**
 * DeviceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create: async function (req, res) {
    const params = req.allParams(); // verificar parámetros
    // Obtenemos los datos del usuario
    params.owner = req.session.user.id;
    var newDevice = await Device.create(params)
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
      const paramsBack = {name:req.param('name'), email: req.param('email')};
      req.session.flash = {errors: errores, params: paramsBack};
      return res.send(400, req.session.flash);
    })
    .fetch();
    return res.send(200, {newDevice});
  },

  /**
   * Devuelve todos los dispositivos registrados del usuario logado
   * @param {*} req
   * @param {*} res
   */
  findAll: async function (req, res) {
    const params = req.allParams();
    const devices = await Device.find({owner: req.session.user.id}).populate('owner');
    res.send(devices);
  }

};

