const Categoria = require('../models/Categoria');

const categoriaRepository = {
  async findAll() {
    return Categoria.find().populate('cursoId');
  },

  async findById(id) {
    return Categoria.findById(id).populate('cursoId');
  },

  async findByCurso(cursoId) {
    return Categoria.find({ cursoId }).populate('cursoId');
  },

  async create(dados) {
    return Categoria.create(dados);
  },

  async deleteById(id) {
    return Categoria.findByIdAndDelete(id);
  },
};

module.exports = categoriaRepository;
