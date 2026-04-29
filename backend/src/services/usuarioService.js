const bcrypt = require('bcryptjs');
const usuarioRepository = require('../repositories/usuarioRepository');

const usuarioService = {
  async listar() {
    return usuarioRepository.findAll();
  },

  async listarCoordenadores() {
    return usuarioRepository.findByRole('COORDENADOR');
  },

  async listarAlunos() {
    return usuarioRepository.findByRole('ALUNO');
  },

  async buscarPorId(id) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) throw Object.assign(new Error('Usuário não encontrado'), { status: 404 });
    return usuario;
  },

  async criar({ email, senha, cursoId, ...resto }) {
    const jaExiste = await usuarioRepository.findByEmailSemSenha(email);
    if (jaExiste) throw Object.assign(new Error('Email já cadastrado'), { status: 400 });

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    return usuarioRepository.create({
      ...resto,
      email,
      senha: senhaCriptografada,
      cursoId: cursoId || null,
    });
  },

  async alterarStatus(id, ativo) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) throw Object.assign(new Error('Usuário não encontrado'), { status: 404 });
    return usuarioRepository.update(id, { ativo });
  },

  async deletar(id) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) throw Object.assign(new Error('Usuário não encontrado'), { status: 404 });
    await usuarioRepository.deleteById(id);
  },
};

module.exports = usuarioService;
