# TKT2Rocket - Guia de Deploy

## Estrutura do Projeto

```
tkt2rocket-export/
├── src/                    # Código fonte React
├── public/                 # Arquivos públicos (index.html, favicon)
├── package.json            # Dependências Node.js
├── tailwind.config.js      # Configuração Tailwind CSS
├── postcss.config.js       # Configuração PostCSS
├── .env.frontend           # Variáveis de ambiente do frontend
└── backend/
    ├── server.py           # API FastAPI
    ├── requirements.txt    # Dependências Python
    └── .env.example        # Exemplo de variáveis de ambiente
```

## Deploy do Frontend (React)

### Opção 1: Vercel (Recomendado)
1. Faça upload do projeto para GitHub
2. Conecte o repositório na Vercel
3. Configure:
   - Build Command: `yarn build`
   - Output Directory: `build`
   - Variável de ambiente: `REACT_APP_BACKEND_URL=https://sua-api.com`

### Opção 2: Netlify
1. Faça upload para GitHub
2. Conecte na Netlify
3. Configure igual à Vercel

### Opção 3: Build Manual
```bash
cd frontend
yarn install
yarn build
# A pasta 'build' contém os arquivos estáticos para upload
```

## Deploy do Backend (FastAPI)

### Opção 1: Railway
1. Faça upload do backend para GitHub
2. Conecte na Railway
3. Configure variáveis de ambiente:
   - `MONGO_URL=mongodb+srv://...`
   - `DB_NAME=tkt2rocket`
   - `RESEND_API_KEY=re_...`
   - `SENDER_EMAIL=noreply@seudominio.com`
   - `AGENCY_EMAIL=contato@tkt2rocket.com.br`

### Opção 2: Render
1. Conecte o repositório
2. Selecione "Web Service"
3. Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`

### Opção 3: VPS (DigitalOcean, AWS, etc.)
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001
```

## Variáveis de Ambiente

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://api.tkt2rocket.com.br
```

### Backend (.env)
```
MONGO_URL=mongodb+srv://usuario:senha@cluster.mongodb.net/
DB_NAME=tkt2rocket
CORS_ORIGINS=https://tkt2rocket.com.br,https://www.tkt2rocket.com.br
RESEND_API_KEY=re_sua_chave_aqui
SENDER_EMAIL=noreply@tkt2rocket.com.br
AGENCY_EMAIL=contato@tkt2rocket.com.br
```

## Checklist de Deploy

- [ ] Configurar domínio (tkt2rocket.com.br)
- [ ] Configurar SSL/HTTPS
- [ ] Atualizar REACT_APP_BACKEND_URL no frontend
- [ ] Configurar MongoDB Atlas ou outro provider
- [ ] Configurar Resend com domínio verificado
- [ ] Testar formulário de contato
- [ ] Testar links WhatsApp e Telegram
- [ ] Verificar SEO com Google Search Console

## Contatos Configurados

- WhatsApp: 5511977983834
- Telegram: @Tkt2Rocket
- Instagram: @tkt2rocket.agencia

## Suporte

Desenvolvido com Emergent.sh
