# HourSync Backend v2 — Node.js + MongoDB

## Stack
- Node.js + Express
- MongoDB (Mongoose)
- JWT + BCrypt
- Nodemailer (Gmail SMTP)
- Multer (upload de arquivos)

## URL da API em produção
https://hoursync-backend.onrender.com

## Como rodar localmente

### 1. Instalar dependências
```
npm install
```

### 2. Configurar variáveis de ambiente
- Copie o arquivo `.env.example` e renomeie para `.env`
- Preencha a `MONGODB_URI` com sua URI do MongoDB Atlas
- As demais variáveis já estão preenchidas

### 3. Rodar
```
npm run dev
```

## Como fazer o deploy no Render

1. Suba o código no GitHub
2. No Render, crie um novo Web Service
3. Conecte ao repositório GitHub
4. Configure as variáveis de ambiente (as mesmas do .env)
5. Build Command: `npm install`
6. Start Command: `npm start`

## Criar o admin após o deploy

POST https://hoursync-backend.onrender.com/usuarios
Body:
```json
{
  "nome": "Admin",
  "email": "admin@hoursync.com",
  "senha": "admin123",
  "role": "SUPER_ADMIN",
  "faculdade": "Faculdade Senac Pernambuco",
  "ativo": true
}
```

## Endpoints principais

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /auth/login | Login |
| GET | /usuarios | Lista usuários |
| POST | /usuarios | Cria usuário |
| GET | /cursos | Lista cursos |
| GET | /certificados | Lista certificados |
| PATCH | /certificados/:id/validar | Aprova/rejeita |
| GET | /dashboard/admin | Métricas admin |
| GET | /dashboard/coordenador/:cursoId | Métricas coordenador |
| POST | /upload | Upload de arquivo |
| GET | /health | Verifica se o servidor está no ar |
