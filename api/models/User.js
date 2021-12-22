/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcryptjs');
const { lastValueFrom } = require('rxjs');
const uuid = require('uuid');

module.exports = {
  // datastore: 'mongodb',

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    name: {
      type: 'string',
      required: true,
    },

    surname: {
      type: 'string',
      required: true,
    },

    email: {
      type: 'string',
      required: true,
  		isEmail: true,
  		unique: true
    },

    password: {
      type: 'string',
      required: true,
      minLength:8
    },

    resetPasswordToken:{
      type: 'string',
      allowNull: true
    },

    resetPasswordExpires:{
      type: 'ref',
      columnType: 'datetime',
      defaultsTo: null
    },

    // isAdmin: { type: 'boolean' },

    role: {
      type: 'string',
      isIn: ['ADMIN', 'USER']
    },

    status: { type: 'boolean' },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    devices: {
      collection: 'device',
      via: 'owner'
    },

  },

  changePassword: function(newPassword, cb){
    console.log("* Metodo cambiar contraseña *");
    console.log(this.password);
    console.log(newPassword);
    this.password = newPassword;
    this.save(function(err, u) {
      // if(err)  return res.serverError(err);
      console.log("Cambiado con exito");
      if(err) return console.log(err);

      console.log(u);
    });
  },

  verifyPassword: function (clave) {
    return bcrypt.compareSync(clave, this.clave);
  },

  customToJSON: function(values, next){
    /*var obj = this.toObject();
    delete obj.password;
    delete obj.passwordConfirmation;
    delete obj._csfr;
    return obj;*/
    return _.omit(this, ['password', 'passwordConfirmation', 'createdAt', 'updatedAt', 'id']);
  },

  beforeCreate: function(values, next){
    // validamos campos
    console.log("Validar usuario antes de crear");
    values.name = values.name.trim();
    values.surname = values.surname.trim();
    values.email = values.email.trim();
    values.password = values.password.trim();
    values.passwordConfirmation = values.passwordConfirmation?.trim();
    values.role = "USER";

    if(!values.passwordConfirmation){
      return next({field: "password", error: "please, repeat the password"});
    }

    if(values.password !== values.passwordConfirmation){
      return next({field: "password", error: "Password not equals"});
    }

    // require('bcrypt').hash(values.clave, 10, function passwordEncrypted(err, encryptedPassword){
      console.log("ciframos la contraseña");
      /*bcrypt.hash(values.password.toString(), null, null, function passwordEncrypted(err, encryptedPassword){
        if(err) return next(err);

        values.password = encryptedPassword;
        // values.online = true;
        next();
    });*/
    /*const encryptedPassword = bcrypt.hashSync(values.password);
    if(!encryptedPassword) {
      throw new Error('Errow meanwhile hashing password');
    }

    values.password = encryptedPassword;
    next();
    */
    values.uuid = uuid.v4();
    sails.helpers.passwords.hashPassword(values.password).exec((err, hashedPassword)=>{
      if (err) { return next(err); }
      values.password = hashedPassword;
      return next();
    });
  },

  beforeUpdate: function (attrs, cb) {
    console.log("Entra a before");
    for (var campo in attrs) {
        var cadena = attrs[campo];

        if(typeof(cadena) === "string"){
          attrs[campo] = cadena.trim();
        }
        // console.log(cadena);
    }
    console.log(attrs);
    console.log("pasa a cambiar la contraseña");
    if(attrs.clave){
        // require('bcrypt').hash(attrs.clave, 10, function passwordEncrypted(err, crypted) {
          bcrypt.hash(attrs.clave.toString(), null, null, function passwordEncrypted(err, crypted) {
          // if(err) return cb(err);
          if(err){
            console.log("Error del bcrypt : " + err);
            return  cb(err);
          }
          console.log("SUCCESS");
          attrs.clave = crypted;
          return cb();
        });
    }
    else {
      console.log("No hay contraseña y devuelve el callack");
      return cb();
    }
  }

};

