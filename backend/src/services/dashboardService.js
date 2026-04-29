const certificadoRepository = require('../repositories/certificadoRepository');
const usuarioRepository = require('../repositories/usuarioRepository');
const cursoRepository = require('../repositories/cursoRepository');

// Interpreta resultado da agregação por status
function parsearAgregacao(agregacao) {
  const resultado = { PENDENTE: 0, APROVADO: 0, REJEITADO: 0, horasValidadas: 0, total: 0 };

  for (const item of agregacao) {
    resultado[item._id] = item.total;
    resultado.total += item.total;
    if (item._id === 'APROVADO') resultado.horasValidadas = item.horas || 0;
  }

  return resultado;
}

const dashboardService = {
  async dashboardAdmin() {
    const [totalCursos, totalCoordenadores, totalAlunos, agregacao] = await Promise.all([
      cursoRepository.count(),
      usuarioRepository.countByRole('COORDENADOR'),
      usuarioRepository.countByRole('ALUNO'),
      certificadoRepository.agregacaoPorStatus(null),
    ]);

    const stats = parsearAgregacao(agregacao);
    const taxaAprovacao = stats.total > 0
      ? Math.round((stats.APROVADO / stats.total) * 10000) / 100
      : 0;

    return {
      totalCursos,
      totalCoordenadores,
      totalAlunos,
      totalCertificados: stats.total,
      certificadosPendentes: stats.PENDENTE,
      certificadosAprovados: stats.APROVADO,
      certificadosRejeitados: stats.REJEITADO,
      horasValidadas: stats.horasValidadas,
      taxaAprovacao,
    };
  },

  async dashboardCoordenador(cursoId) {
    const agregacao = await certificadoRepository.agregacaoPorStatus(cursoId);
    const stats = parsearAgregacao(agregacao);
    const taxaAprovacao = stats.total > 0
      ? Math.round((stats.APROVADO / stats.total) * 10000) / 100
      : 0;

    return {
      totalCursos: 0,
      totalCoordenadores: 0,
      totalAlunos: 0,
      totalCertificados: stats.total,
      certificadosPendentes: stats.PENDENTE,
      certificadosAprovados: stats.APROVADO,
      certificadosRejeitados: stats.REJEITADO,
      horasValidadas: stats.horasValidadas,
      taxaAprovacao,
    };
  },
};

module.exports = dashboardService;
