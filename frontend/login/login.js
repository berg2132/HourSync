document.addEventListener("DOMContentLoaded", function () {
  const loginForm     = document.getElementById("loginForm");
  const loginEmail    = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const loginError    = document.getElementById("loginError");
  const btnSubmit     = loginForm.querySelector("button[type=submit]") || loginForm.querySelector("button");

  // Se já está logado, redireciona
  if (Auth.isLogado()) {
    redirecionarPorRole(Auth.getRole());
  }

  function showError(message) {
    loginError.textContent = message;
    loginError.classList.remove("visually-hidden");
  }

  function hideError() {
    loginError.textContent = "";
    loginError.classList.add("visually-hidden");
  }

  function redirecionarPorRole(role) {
    const base = "..";
    if (role === "SUPER_ADMIN") {
      window.location.href = `${base}/dashboard_admin/dashboard_admin.html`;
    } else if (role === "COORDENADOR") {
      window.location.href = `${base}/dashboard_coordenador/dashboard_coordenador.html`;
    } else if (role === "ALUNO") {
      window.location.href = `${base}/dashboard_aluno/dashboard_aluno.html`;
    }
  }

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    hideError();

    const email = loginEmail.value.trim();
    const senha = loginPassword.value;

    if (!email || !senha) {
      showError("Preencha email e senha para continuar.");
      return;
    }

    const textoOriginal = btnSubmit ? btnSubmit.innerHTML : null;
    if (btnSubmit) {
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = "Aguarde...";
    }

    try {
      const usuario = await Auth.login(email, senha);
      redirecionarPorRole(usuario.role);

      if (!["SUPER_ADMIN", "COORDENADOR", "ALUNO"].includes(usuario.role)) {
        showError("Perfil de usuário não reconhecido.");
      }
    } catch (err) {
      showError(err.message || "Email ou senha inválidos.");
    } finally {
      if (btnSubmit) {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = textoOriginal || "Acessar Plataforma";
      }
    }
  });
});
