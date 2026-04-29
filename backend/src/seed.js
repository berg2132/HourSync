/**
 * seed.js — Cria o SUPER_ADMIN inicial no banco de dados.
 * Execute UMA VEZ após subir o backend:
 *   node src/seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Conectado ao MongoDB');

  const Usuario = require('./models/Usuario');

  const existe = await Usuario.findOne({ email: 'admin@hoursync.com' });
  if (existe) {
    console.log('Admin já existe! Email: admin@hoursync.com');
    await mongoose.disconnect();
    return;
  }

  const senha = await bcrypt.hash('Admin@2026', 10);
  await Usuario.create({
    nome: 'Administrador',
    email: 'admin@hoursync.com',
    senha,
    role: 'SUPER_ADMIN',
    ativo: true,
  });

  console.log('Admin criado com sucesso!');
  console.log('Email: admin@hoursync.com');
  console.log('Senha: Admin@2026');
  console.log('Troque a senha após o primeiro login.');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error('Erro no seed:', err);
  process.exit(1);
});
