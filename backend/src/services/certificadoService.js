const certificadoRepository = require('../repositories/certificadoRepository');
const usuarioRepository = require('../repositories/usuarioRepository');
const categoriaRepository = require('../repositories/categoriaRepository');
const cursoRepository = require('../repositories/cursoRepository');
const emailService = require('./emailService');

const certificadoService = {
  async listar() {
    return certificadoRepository.findAll();
  },

  async buscarPorId(id) {
    const cert = await certificadoRepository.findById(id);
    if (!cert) throw Object.assign(new Error('Certificado não encontrado'), { status: 404 });
    return cert;
  },

  async listarPorAluno(alunoId) {
    return certificadoRepository.findByAluno(alunoId);
  },

  async listarPorCurso(cursoId) {
    return certificadoRepository.findByCurso(cursoId);
  },

  async listarPorStatus(status) {
    return certificadoRepository.findByStatus(status);
  },

  async criar(body) {
    // Aceita tanto { alunoId, categoriaId, cursoId }
    // quanto { aluno: { id }, categoria: { id }, curso: { id } } (formato do front)
    const alunoId    = body.alunoId    || body.aluno?.id    || body.aluno?._id;
    const categoriaId = body.categoriaId || body.categoria?.id || body.categoria?._id;
    const cursoId    = body.cursoId    || body.curso?.id    || body.curso?._id;

    if (!alunoId)     throw Object.assign(new Error('Aluno obrigatório'), { status: 400 });
    if (!categoriaId) throw Object.assign(new Error('Categoria obrigatória'), { status: 400 });
    if (!cursoId)     throw Object.assign(new Error('Curso obrigatório'), { status: 400 });

    const [aluno, categoria, curso] = await Promise.all([
      usuarioRepository.findById(alunoId),
      categoriaRepository.findById(categoriaId),
      cursoRepository.findById(cursoId),
    ]);

    if (!aluno)     throw Object.assign(new Error('Aluno não encontrado'), { status: 400 });
    if (!categoria) throw Object.assign(new Error('Categoria não encontrada'), { status: 400 });
    if (!curso)     throw Object.assign(new Error('Curso não encontrado'), { status: 400 });

    const { aluno: _a, categoria: _c, curso: _cu, ...resto } = body;

    return certificadoRepository.create({
      ...resto,
      alunoId,
      categoriaId,
      cursoId,
      status: 'PENDENTE',
    });
  },

  async validar(id, { status, justificativa, motivo, coordenadorId }) {
    const cert = await this.buscarPorId(id);

    // Aceita tanto "justificativa" quanto "motivo" (front usa motivo)
    const textoJustificativa = justificativa || motivo || null;

    const atualizacao = { status, justificativa: textoJustificativa };
    if (coordenadorId) atualizacao.coordenadorId = coordenadorId;

    const updated = await certificadoRepository.update(id, atualizacao);

    const aluno = updated.alunoId;
    const titulo = cert.titulo;

    if (status === 'APROVADO') {
      emailService.enviarEmailAprovacao(aluno.email, aluno.nome, titulo).catch(console.error);
    } else if (status === 'REJEITADO') {
      emailService.enviarEmailRejeicao(aluno.email, aluno.nome, titulo, textoJustificativa).catch(console.error);
    }

    return updated;
  },
};

module.exports = certificadoService;
