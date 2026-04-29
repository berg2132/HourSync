const Usuario = require('../models/Usuario');

const usuarioRepository = {
  async findAll() {
    return Usuario.find().populate('cursoId');
  },

  async findById(id) {
    return Usuario.findById(id).populate('cursoId');
  },

  async findByEmail(email) {
    // select: false na senha — aqui precisamos dela explicitamente
    return Usuario.findOne({ email }).select('+senha').populate('cursoId');
  },

  async findByEmailSemSenha(email) {
    return Usuario.findOne({ email }).populate('cursoId');
  },

  async findByRole(role) {
    return Usuario.find({ role }).populate('cursoId');
  },

  async create(dados) {
    return Usuario.create(dados);
  },

  async update(id, dados) {
    return Usuario.findByIdAndUpdate(id, { $set: dados }, { new: true }).populate('cursoId');
  },

  async deleteById(id) {
    return Usuario.findByIdAndDelete(id);
  },

  async countByRole(role) {
    return Usuario.countDocuments({ role });
  },
};

module.exports = usuarioRepository;
