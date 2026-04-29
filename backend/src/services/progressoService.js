const usuarioRepository = require('../repositories/usuarioRepository');
const cursoRepository = require('../repositories/cursoRepository');
const certificadoRepository = require('../repositories/certificadoRepository');

const progressoService = {
  async progressoPorCurso(cursoId) {
    const curso = await cursoRepository.findById(cursoId);
    if (!curso) return [];

    const alunos = await usuarioRepository.findByRole('ALUNO');
    const horasExigidas = curso.horasExigidas;

    const resultado = await Promise.all(
      alunos.map(async (aluno) => {
        const certs = await certificadoRepository.findByAlunoAndStatus(aluno._id, 'APROVADO', cursoId);
        const horasAcumuladas = certs.reduce((soma, c) => soma + (c.horas || 0), 0);
        const percentual = horasExigidas > 0
          ? Math.round((horasAcumuladas / horasExigidas) * 10000) / 100
          : 0;

        return {
          alunoId: aluno._id,
          nomeAluno: aluno.nome,
          horasAcumuladas,
          horasExigidas,
          percentual,
          status: percentual >= 100 ? 'Concluído' : 'Em Andamento',
        };
      })
    );

    return resultado;
  },

  async progressoPorAluno(alunoId) {
    const aluno = await usuarioRepository.findById(alunoId);
    if (!aluno) throw Object.assign(new Error('Aluno não encontrado'), { status: 404 });

    const certs = await certificadoRepository.findByAlunoAndStatus(aluno._id, 'APROVADO');
    const horasAcumuladas = certs.reduce((soma, c) => soma + (c.horas || 0), 0);
    const horasExigidas = aluno.cursoId ? aluno.cursoId.horasExigidas : 0;
    const percentual = horasExigidas > 0
      ? Math.round((horasAcumuladas / horasExigidas) * 10000) / 100
      : 0;

    return {
      alunoId: aluno._id,
      nomeAluno: aluno.nome,
      horasAcumuladas,
      horasExigidas,
      percentual,
      status: percentual >= 100 ? 'Concluído' : 'Em Andamento',
    };
  },

  async calcularHoras(certificadoId) {
    const cert = await certificadoRepository.findById(certificadoId);
    if (!cert) throw Object.assign(new Error('Certificado não encontrado'), { status: 404 });

    const alunoId = cert.alunoId._id;
    const cursoId = cert.cursoId._id;
    const limiteSemestral = cert.cursoId?.horasPorSemestre || 25;

    const certsAprovados = await certificadoRepository.findByAlunoAndStatus(alunoId, 'APROVADO', cursoId);
    const horasUtilizadas = certsAprovados.reduce((soma, c) => soma + (c.horas || 0), 0);
    const horasDisponiveis = Math.max(0, limiteSemestral - horasUtilizadas);
    const horasSolicitadas = cert.horas || 0;
    const horasQueSeraoAprovadas = Math.min(horasSolicitadas, horasDisponiveis);

    let mensagem;
    if (horasDisponiveis === 0) {
      mensagem = 'Aluno já completou as horas máximas neste semestre';
    } else if (horasSolicitadas > horasDisponiveis) {
      mensagem = `Aprovado parcialmente devido ao limite semestral de ${limiteSemestral}h`;
    } else {
      mensagem = 'Aprovado integralmente';
    }

    return {
      alunoId,
      nomeAluno: cert.alunoId.nome,
      horasSolicitadas,
      horasUtilizadasSemestre: horasUtilizadas,
      limiteSemestral,
      horasDisponiveis,
      horasQueSeraoAprovadas,
      mensagem,
    };
  },
};

module.exports = progressoService;
