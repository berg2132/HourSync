const Certificado = require('../models/Certificado');
const mongoose = require('mongoose');

const populate = [
  { path: 'alunoId', select: '-senha' },
  { path: 'coordenadorId', select: '-senha' },
  { path: 'categoriaId' },
  { path: 'cursoId' },
];

const certificadoRepository = {
  async findAll() {
    return Certificado.find().populate(populate);
  },

  async findById(id) {
    return Certificado.findById(id).populate(populate);
  },

  async findByAluno(alunoId) {
    return Certificado.find({ alunoId }).populate([
      { path: 'alunoId', select: '-senha' },
      { path: 'categoriaId' },
      { path: 'cursoId' },
    ]);
  },

  async findByCurso(cursoId) {
    return Certificado.find({ cursoId }).populate([
      { path: 'alunoId', select: '-senha' },
      { path: 'categoriaId' },
      { path: 'cursoId' },
    ]);
  },

  async findByStatus(status) {
    return Certificado.find({ status }).populate([
      { path: 'alunoId', select: '-senha' },
      { path: 'categoriaId' },
      { path: 'cursoId' },
    ]);
  },

  async findByAlunoAndStatus(alunoId, status, cursoId) {
    const filtro = { alunoId, status };
    if (cursoId) filtro.cursoId = cursoId;
    return Certificado.find(filtro);
  },

  async create(dados) {
    return Certificado.create(dados);
  },

  async update(id, dados) {
    return Certificado.findByIdAndUpdate(id, { $set: dados }, { new: true }).populate([
      { path: 'alunoId', select: '-senha' },
      { path: 'categoriaId' },
      { path: 'cursoId' },
    ]);
  },

  // Agregação única para substituir 7 queries do dashboard
  async agregacaoPorStatus(cursoId) {
    const match = cursoId
      ? { cursoId: new mongoose.Types.ObjectId(cursoId) }
      : {};

    return Certificado.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$status',
          total: { $sum: 1 },
          horas: { $sum: '$horas' },
        },
      },
    ]);
  },

  async countByCurso(cursoId) {
    return Certificado.countDocuments({ cursoId });
  },

  async countTotal() {
    return Certificado.countDocuments();
  },
};

module.exports = certificadoRepository;
