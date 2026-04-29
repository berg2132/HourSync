# HourSync — Guia de Deploy

## Stack
- **Backend**: Node.js + Express + MongoDB (Render)
- **Frontend**: HTML/CSS/JS puro (GitHub Pages)
- **Banco**: MongoDB Atlas

---

## 1. MongoDB Atlas — Liberar acesso

1. Acesse [cloud.mongodb.com](https://cloud.mongodb.com)
2. Seu cluster → **Network Access** → **Add IP Address**
3. Coloque `0.0.0.0/0` (libera para qualquer IP, incluindo o Render)
4. Clique em **Confirm**

---

## 2. Backend no Render

1. Acesse [render.com](https://render.com) → **New Web Service**
2. Conecte o repositório GitHub com a pasta `backend/`
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`
4. Vá em **Environment** → adicione as variáveis:

```
MONGODB_URI=mongodb+srv://arthurvns11_db_user:2132@cluster0.qnsl6xz.mongodb.net/hoursync?appName=Cluster0
JWT_SECRET=hoursync_jwt_secret_2026_muito_seguro
JWT_EXPIRES_IN=7d
PORT=8080
CORS_ORIGIN=*
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=hoursync.sistema@gmail.com
MAIL_PASS=hrebegobhrfqkoaz
```

5. **Deploy** → aguarde ficar verde
6. Copie a URL do serviço (ex: `https://hoursync-abc123.onrender.com`)

---

## 3. Criar o Admin inicial

Depois que o Render estiver no ar, execute **uma vez** localmente:

```bash
cd backend
MONGODB_URI="mongodb+srv://arthurvns11_db_user:2132@cluster0.qnsl6xz.mongodb.net/hoursync?appName=Cluster0" node src/seed.js
```

Isso cria:
- **Email**: admin@hoursync.com
- **Senha**: Admin@2026

---

## 4. Frontend no GitHub Pages

1. No arquivo `frontend/shared/api.js`, **linha 9**, substitua a URL:
```js
const API_BASE = "https://SUA-URL-REAL.onrender.com";
```

2. Suba a pasta `frontend/` para um repositório GitHub
3. Vá em **Settings** → **Pages** → selecione a branch e pasta raiz (`/`)
4. Acesse a URL do GitHub Pages

---

## 5. Testar se está funcionando

Acesse `https://SUA-URL-RENDER.onrender.com/health`

Deve retornar: `{"status":"ok","message":"HourSync Backend rodando!"}`

---

## Problemas comuns

| Problema | Solução |
|---|---|
| Backend não conecta ao MongoDB | Verifique Network Access no Atlas (libere `0.0.0.0/0`) |
| Render dá erro na inicialização | Confira as variáveis de ambiente no painel do Render |
| Frontend não consegue chamar o backend | Confirme a URL em `shared/api.js` |
| Login retorna 404 | O Render pode estar hibernando — aguarde 30s e tente novamente |
