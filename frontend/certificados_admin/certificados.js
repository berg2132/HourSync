/* =====================================================
   HourSync — certificados.js  (v29)
   Usado por: certificados_coordenador.html e certificados_admin.html
   ===================================================== */

const CATEGORIAS_MANUAL = {
  "Atividades de Ensino": {
    cor: "#4f46e5",
    subcategorias: [
      { codigo: "1.1", descricao: "Participação em monitoria no curso",                                      limiteHoras: 20, unidade: "por semestre" },
      { codigo: "1.2", descricao: "Comparecimento a defesas de monografias – temas pertinentes",             limiteHoras: 2,  unidade: "por participação" },
      { codigo: "1.3", descricao: "Disciplina cursada em outros cursos da Faculdade Senac",                  limiteHoras: 20, unidade: "por disciplina" },
      { codigo: "1.4", descricao: "Disciplinas cursadas fora da Faculdade Senac",                            limiteHoras: 20, unidade: "por disciplina" },
      { codigo: "1.5", descricao: "Cursos instrumentais – informática e/ou Língua Estrangeira",              limiteHoras: 10, unidade: "por semestre" },
      { codigo: "1.6", descricao: "Certificações Reconhecidas da área",                                      limiteHoras: 10, unidade: "por semestre" },
      { codigo: "1.7", descricao: "Elaboração de material didático com supervisão do professor",             limiteHoras: 5,  unidade: "por material" },
      { codigo: "1.8", descricao: "Atividade extraclasse promovida como parte da formação do aluno",         limiteHoras: 10, unidade: "por participação" },
      { codigo: "1.9", descricao: "Visitas técnicas",                                                        limiteHoras: 4,  unidade: "por visita" }
    ]
  },
  "Atividades de Pesquisa": {
    cor: "#0891b2",
    subcategorias: [
      { codigo: "2.1", descricao: "Participação em pesquisas ou atividades de pesquisa",                    limiteHoras: 10, unidade: "por produto final publicado" },
      { codigo: "2.2", descricao: "Programas de bolsa de Iniciação Científica",                             limiteHoras: 20, unidade: "por bolsa" },
      { codigo: "2.3", descricao: "Publicações de artigos em revistas, periódicos e congêneres",            limiteHoras: 10, unidade: "por produto publicado" },
      { codigo: "2.4", descricao: "Publicação em livro na área",                                            limiteHoras: 40, unidade: "por produto publicado" },
      { codigo: "2.5", descricao: "Participação em programa especial de treinamento",                       limiteHoras: 10, unidade: "por semestre" }
    ]
  },
  "Atividades de Extensão": {
    cor: "#059669",
    subcategorias: [
      { codigo: "3.1", descricao: "Participação em seminários, congressos, conferências, encontros",        limiteHoras: 10, unidade: "por participação (4h como público)" },
      { codigo: "3.2", descricao: "Atendimento comunitário de cunho social",                                limiteHoras: 10, unidade: "por semestre" },
      { codigo: "3.3", descricao: "Apresentação de trabalhos, concursos, exposições, mostras",              limiteHoras: 10, unidade: "pela apresentação" },
      { codigo: "3.4", descricao: "Estágio extracurricular em entidades públicas ou privadas conveniadas",  limiteHoras: 20, unidade: "por semestre" },
      { codigo: "3.5", descricao: "Participação em órgãos colegiados da Faculdade Senac",                   limiteHoras: 5,  unidade: "por semestre" },
      { codigo: "3.6", descricao: "Representação estudantil",                                               limiteHoras: 10, unidade: "por semestre" },
      { codigo: "3.7", descricao: "Cursos de extensão universitária, dentro ou fora da Faculdade Senac",    limiteHoras: 10, unidade: "por curso" }
    ]
  }
};

// horasUtilizadasCurso = horas já aprovadas no total do curso
// totalRequired = carga total exigida no curso
const alunosInfo = {
  1: { nome: "João Silva",       matricula: "2022001", curso: "ADS",           horasUtilizadasCurso: 45,  totalRequired: 100 },
  2: { nome: "Maria Menezes",    matricula: "2022002", curso: "ADS",           horasUtilizadasCurso: 30,  totalRequired: 100 },
  3: { nome: "Ana Maria",        matricula: "2021003", curso: "Gastronomia",   horasUtilizadasCurso: 60,  totalRequired: 100 },
  4: { nome: "Julia Barboza",    matricula: "2023004", curso: "Design",        horasUtilizadasCurso: 20,  totalRequired: 100 },
  5: { nome: "Marcos Vinicius",  matricula: "2022005", curso: "ADS",           horasUtilizadasCurso: 80,  totalRequired: 100 },
  6: { nome: "Camila Fernandes", matricula: "2023006", curso: "Administração", horasUtilizadasCurso: 10,  totalRequired: 100 },
  7: { nome: "Rafael Menezes",   matricula: "2021007", curso: "ADS",           horasUtilizadasCurso: 55,  totalRequired: 100 }
};

let certificadosData = [
  { id:1, alunoId:1, aluno:"João Silva",       curso:"ADS",           turma:"TADS047", grupo:"Atividades de Ensino",    codigoAtividade:"1.8", descricaoAtividade:"Atividade extraclasse promovida como parte da formação do aluno", horasSolicitadas:20, data:"12/03/2026", status:"Pendente",  imgUrl:"img/certificado.png", horasAprovadas:null },
  { id:2, alunoId:2, aluno:"Maria Menezes",    curso:"ADS",           turma:"TADS048", grupo:"Atividades de Extensão",  codigoAtividade:"3.7", descricaoAtividade:"Cursos de extensão universitária, dentro ou fora da Faculdade Senac",   horasSolicitadas:40, data:"15/03/2026", status:"Pendente",  imgUrl:"img/certificado.png", horasAprovadas:null },
  { id:3, alunoId:3, aluno:"Ana Maria",        curso:"Gastronomia",   turma:"GAS022",  grupo:"Atividades de Pesquisa",  codigoAtividade:"2.5", descricaoAtividade:"Participação em programa especial de treinamento",                      horasSolicitadas:10, data:"10/03/2026", status:"Aprovado",  imgUrl:"img/certificado.png", horasAprovadas:10 },
  { id:4, alunoId:4, aluno:"Julia Barboza",    curso:"Design",        turma:"DSG011",  grupo:"Atividades de Extensão",  codigoAtividade:"3.1", descricaoAtividade:"Participação em seminários, congressos, conferências, encontros",        horasSolicitadas:30, data:"05/03/2026", status:"Rejeitado", imgUrl:"img/certificado.png", horasAprovadas:null },
  { id:5, alunoId:5, aluno:"Marcos Vinicius",  curso:"ADS",           turma:"TADS047", grupo:"Atividades de Pesquisa",  codigoAtividade:"2.1", descricaoAtividade:"Participação em pesquisas ou atividades de pesquisa",                   horasSolicitadas:15, data:"20/02/2026", status:"Aprovado",  imgUrl:"img/certificado.png", horasAprovadas:0 },
  { id:6, alunoId:6, aluno:"Camila Fernandes", curso:"Administração", turma:"ADM033",  grupo:"Atividades de Ensino",    codigoAtividade:"1.6", descricaoAtividade:"Certificações Reconhecidas da área",                                    horasSolicitadas:25, data:"18/03/2026", status:"Pendente",  imgUrl:"img/certificado.png", horasAprovadas:null },
  { id:7, alunoId:7, aluno:"Rafael Menezes",   curso:"ADS",           turma:"TADS049", grupo:"Atividades de Extensão",  codigoAtividade:"3.4", descricaoAtividade:"Estágio extracurricular em entidades públicas ou privadas conveniadas", horasSolicitadas:20, data:"22/03/2026", status:"Pendente",  imgUrl:"img/certificado.png", horasAprovadas:null }
];

let currentSearchTerm = "";
let currentCertificadoSelecionado = null;
let modalCert, modalConfirm, modalRej;

function getGrupoBadge(grupo) {
  const info = CATEGORIAS_MANUAL[grupo];
  if (!info) return `<span class="badge bg-secondary">${grupo || '—'}</span>`;
  return `<span class="badge" style="background:${info.cor}22;color:${info.cor};border:1px solid ${info.cor}55;">${grupo}</span>`;
}

/* Retorna o limite da subcategoria a partir do CATEGORIAS_MANUAL local */
function getLimiteSubcategoriaLocal(grupo, codigo) {
  const g = CATEGORIAS_MANUAL[grupo];
  if (!g) return null;
  const sub = g.subcategorias.find(s => s.codigo === codigo);
  return sub ? sub.limiteHoras : null;
}

function updateStats() {
  document.getElementById("pendentesCount").innerText  = certificadosData.filter(c => c.status === "Pendente").length;
  document.getElementById("aprovadosCount").innerText  = certificadosData.filter(c => c.status === "Aprovado").length;
  document.getElementById("rejeitadosCount").innerText = certificadosData.filter(c => c.status === "Rejeitado").length;
}

function renderTabelaCertificados() {
  const term     = currentSearchTerm.toLowerCase().trim();
  const filtered = term
    ? certificadosData.filter(c => c.aluno.toLowerCase().includes(term))
    : [...certificadosData];

  const tbody = document.getElementById("certificadosTableBody");
  tbody.innerHTML = "";

  filtered.forEach(cert => {
    let statusHtml = "";
    if (cert.status === "Aprovado") {
      const h = cert.horasAprovadas !== null ? cert.horasAprovadas : cert.horasSolicitadas;
      statusHtml = `<span class="status-aprovado"><i class="bi bi-check-circle-fill me-1"></i>Aprovado (${h}h)</span>`;
    } else if (cert.status === "Pendente") {
      statusHtml = `<span class="status-pendente"><i class="bi bi-hourglass-split me-1"></i>Pendente</span>`;
    } else {
      statusHtml = `<span class="status-rejeitado"><i class="bi bi-x-circle-fill me-1"></i>Rejeitado</span>`;
    }

    const btnAnalise = cert.status === "Pendente"
      ? `<button class="btn-analisar" data-id="${cert.id}">Analisar</button>`
      : `<button class="btn-analisar" style="background:#b0b8d4;cursor:not-allowed;" disabled>Analisar</button>`;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${cert.aluno}</strong></td>
      <td>${cert.curso}</td>
      <td>${cert.turma}</td>
      <td>
        ${getGrupoBadge(cert.grupo)}<br>
        <small class="text-muted"><strong>${cert.codigoAtividade}</strong> — ${cert.descricaoAtividade}</small>
      </td>
      <td>${cert.horasSolicitadas}h</td>
      <td>${cert.data}</td>
      <td>${statusHtml}</td>
      <td>${btnAnalise}</td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("exibindoCount").innerText = filtered.length;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-muted">Nenhum certificado encontrado</td></tr>`;
  }

  document.querySelectorAll(".btn-analisar[data-id]").forEach(btn => {
    btn.addEventListener("click", () => {
      const cert = certificadosData.find(c => c.id === parseInt(btn.dataset.id));
      if (cert && cert.status === "Pendente") abrirModalVisualizar(cert);
    });
  });
}

/* -------- Modal Visualizar -------- */
function abrirModalVisualizar(certificado) {
  currentCertificadoSelecionado = certificado;

  const img  = document.getElementById("modalCertificadoImg");
  const link = document.getElementById("modalCertificadoLink");
  const imgSrc = certificado.imgUrl || "img/certificado.png";
  if (img) img.src = imgSrc;
  if (link) link.href = imgSrc;

  const aluno = alunosInfo[certificado.alunoId];
  const limiteSubcat = getLimiteSubcategoriaLocal(certificado.grupo, certificado.codigoAtividade);

  const el = (id, val) => { const e = document.getElementById(id); if (e) e.innerHTML = val; };

  el("modalAlunoNome",       certificado.aluno);
  el("modalAlunoMatricula",  aluno?.matricula || "—");
  el("modalCurso",           certificado.curso);
  el("modalCategoria", `
    ${getGrupoBadge(certificado.grupo)}
    <br><small class="text-muted mt-1 d-inline-block">
      <strong>${certificado.codigoAtividade}</strong> — ${certificado.descricaoAtividade}
    </small>
  `);
  // Limite da subcategoria
  el("modalLimiteSubcat", limiteSubcat !== null
    ? `<strong>${limiteSubcat}h</strong> <span class="text-muted" style="font-size:0.82rem;">(limite máximo desta atividade)</span>`
    : `<span class="text-muted">Não definido</span>`
  );

  modalCert.show();
}

/* -------- Modal Confirmação -------- */
function abrirModalConfirmacao() {
  if (!currentCertificadoSelecionado) return;
  modalCert.hide();
  renderizarCalculoConfirmacao(currentCertificadoSelecionado, alunosInfo);
  modalConfirm.show();
}

function confirmarAprovacao() {
  if (!currentCertificadoSelecionado) return;
  const aluno              = alunosInfo[currentCertificadoSelecionado.alunoId];
  const limiteSubcategoria = getLimiteSubcategoriaLocal(currentCertificadoSelecionado.grupo, currentCertificadoSelecionado.codigoAtividade);
  const calculo = calcularHorasAprovadas(limiteSubcategoria);

  currentCertificadoSelecionado.status        = "Aprovado";
  currentCertificadoSelecionado.horasAprovadas = calculo.aprovadas;
  aluno.horasUtilizadasCurso += calculo.aprovadas;

  updateStats();
  renderTabelaCertificados();
  modalConfirm.hide();

  // Modal de sucesso: só o título, sem detalhes
  showResultModal("success", "Certificado Aprovado com Sucesso!", "");
  currentCertificadoSelecionado = null;
}

function cancelarConfirmacao() {
  modalConfirm.hide();
  currentCertificadoSelecionado = null;
}

/* -------- Modal Rejeição -------- */
function abrirModalRejeicao() {
  modalCert.hide();
  document.getElementById("motivoRejeicao").value = "";
  modalRej.show();
}

function confirmarRejeicao() {
  const motivo = document.getElementById("motivoRejeicao").value.trim();
  if (!motivo) { showNotification('Digite um motivo para a rejeição.', 'warning'); return; }
  if (!currentCertificadoSelecionado) return;

  currentCertificadoSelecionado.status = "Rejeitado";
  updateStats();
  renderTabelaCertificados();
  modalRej.hide();
  showResultModal("danger", "Certificado Rejeitado", `Aluno: ${currentCertificadoSelecionado.aluno}\nMotivo: ${motivo}`);
  currentCertificadoSelecionado = null;
}

/* -------- Init -------- */
function init() {
  updateStats();
  renderTabelaCertificados();

  modalCert    = new bootstrap.Modal(document.getElementById("modalCertificado"));
  modalConfirm = new bootstrap.Modal(document.getElementById("modalConfirmacaoAprovacao"));
  modalRej     = new bootstrap.Modal(document.getElementById("modalRejeicao"));

  document.getElementById("btnAprovarModal")?.addEventListener("click", abrirModalConfirmacao);
  document.getElementById("btnRejeitarModal")?.addEventListener("click", abrirModalRejeicao);
  document.getElementById("btnConfirmarAprovacao")?.addEventListener("click", confirmarAprovacao);
  document.getElementById("btnCancelarConfirmacao")?.addEventListener("click", cancelarConfirmacao);
  document.getElementById("confirmarRejeicaoBtn")?.addEventListener("click", confirmarRejeicao);

  document.getElementById("searchInput")?.addEventListener("input", e => {
    currentSearchTerm = e.target.value;
    renderTabelaCertificados();
  });
}

init();
