const bcrypt = require('bcryptjs');
const usuarioRepository = require('../repositories/usuarioRepository');
const jwtUtil = require('../utils/jwtUtil');

const authService = {
  async login(email, senha) {
    const usuario = await usuarioRepository.findByEmail(email);
    if (!usuario) {
      throw Object.assign(new Error('Usuário não encontrado'), { status: 404 });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      throw Object.assign(new Error('Senha incorreta'), { status: 401 });
    }

    if (!usuario.ativo) {
      throw Object.assign(new Error('Usuário inativo'), { status: 403 });
    }

    const token = jwtUtil.gerarToken(usuario.email, usuario.role);

    // Retorna "usuario" como objeto — front espera data.usuario
    return {
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
        cursoId: usuario.cursoId?._id || usuario.cursoId || null,
        fotoUrl: usuario.fotoUrl || null,
      }
    };
  },

  async resetSenha(email, novaSenha) {
    const usuario = await usuarioRepository.findByEmailSemSenha(email);
    if (!usuario) {
      throw Object.assign(new Error('Usuário não encontrado'), { status: 404 });
    }
    const senhaCriptografada = await bcrypt.hash(novaSenha, 10);
    return usuarioRepository.update(usuario._id, { senha: senhaCriptografada });
  },
};

module.exports = authService;
