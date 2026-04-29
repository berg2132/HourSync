document.addEventListener("DOMContentLoaded", async function () {
  // Verifica autenticação
  if (!Auth.isLogado()) {
    window.location.href = "../login/login.html";
    return;
  }

  const usuario = Auth.getUsuario();
  if (usuario?.role !== "SUPER_ADMIN") {
    window.location.href = "../login/login.html";
    return;
  }

  // Exibe nome do usuário no header se existir elemento
  const nomeEl = document.getElementById("nomeUsuario");
  if (nomeEl) nomeEl.textContent = usuario.nome || "Administrador";

  // Logout
  document.getElementById("btnLogout")?.addEventListener("click", () => Auth.logout());

  // Carrega dados do dashboard
  try {
    const dados = await Dashboard.admin();

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val ?? "0";
    };

    set("totalCursos",        dados.totalCursos);
    set("totalCoordenadores", dados.totalCoordenadores);
    set("totalAlunos",        dados.totalAlunos);
    set("totalCertificados",  dados.totalCertificados);
    set("certPendentes",      dados.certificadosPendentes);
    set("certAprovados",      dados.certificadosAprovados);
    set("certRejeitados",     dados.certificadosRejeitados);
    set("horasValidadas",     dados.horasValidadas);
    set("taxaAprovacao",      dados.taxaAprovacao + "%");
  } catch (err) {
    console.error("Erro ao carregar dashboard:", err);
  }

  // Gráfico de barras (Chart.js)
  const ctx = document.getElementById("atividadesChart");
  if (ctx) {
    new Chart(ctx.getContext("2d"), {
      type: "bar",
      data: {
        labels: ["Pendentes", "Aprovados", "Rejeitados"],
        datasets: [{
          label: "Certificados",
          data: [0, 0, 0],
          backgroundColor: ["#f4a261", "#2a9d8f", "#e76f51"],
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: "#e9ecef" } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // Pesquisa na tabela
  document.getElementById("searchInput")?.addEventListener("input", e => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll(".table-custom tbody tr").forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(term) ? "" : "none";
    });
  });
});
