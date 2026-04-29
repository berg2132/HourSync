const Curso = require('../models/Curso');

const cursoRepository = {
  async findAll() {
    return Curso.find();
  },

  async findById(id) {
    return Curso.findById(id);
  },

  async create(dados) {
    return Curso.create(dados);
  },

  async deleteById(id) {
    return Curso.findByIdAndDelete(id);
  },

  async count() {
    return Curso.countDocuments();
  },
};

module.exports = cursoRepository;
