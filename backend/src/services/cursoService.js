const cursoRepository = require('../repositories/cursoRepository');

const cursoService = {
  async listar() {
    return cursoRepository.findAll();
  },

  async buscarPorId(id) {
    const curso = await cursoRepository.findById(id);
    if (!curso) throw Object.assign(new Error('Curso não encontrado'), { status: 404 });
    return curso;
  },

  async criar(dados) {
    return cursoRepository.create(dados);
  },

  async deletar(id) {
    const curso = await cursoRepository.findById(id);
    if (!curso) throw Object.assign(new Error('Curso não encontrado'), { status: 404 });
    await cursoRepository.deleteById(id);
  },
};

module.exports = cursoService;
