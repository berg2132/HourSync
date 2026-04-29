const categoriaRepository = require('../repositories/categoriaRepository');
const cursoRepository = require('../repositories/cursoRepository');

const categoriaService = {
  async listar() {
    return categoriaRepository.findAll();
  },

  async listarPorCurso(cursoId) {
    return categoriaRepository.findByCurso(cursoId);
  },

  async criar({ cursoId, ...dados }) {
    if (!cursoId) throw Object.assign(new Error('cursoId é obrigatório'), { status: 400 });

    const curso = await cursoRepository.findById(cursoId);
    if (!curso) throw Object.assign(new Error('Curso não encontrado'), { status: 404 });

    return categoriaRepository.create({ ...dados, cursoId });
  },

  async deletar(id) {
    const categoria = await categoriaRepository.findById(id);
    if (!categoria) throw Object.assign(new Error('Categoria não encontrada'), { status: 404 });
    await categoriaRepository.deleteById(id);
  },
};

module.exports = categoriaService;
