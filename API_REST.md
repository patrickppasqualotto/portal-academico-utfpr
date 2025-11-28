# 🚀 Parte 2 - API REST com JWT

A API REST foi implementada com sucesso! Todos os 7 endpoints estão disponíveis na versão v1.

## 📋 Autenticação

### Login (Obter Token JWT)
```bash
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "senha": "senha123"
  }'
```

**Resposta:**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "usuario": {
      "id_usuario": 1,
      "nome": "Usuario Teste",
      "email": "usuario@example.com",
      "tipo_usuario": "aluno"
    },
    "expiracaoEm": "2024-01-20T16:00:00.000Z"
  }
}
```

### Verificar Token
```bash
curl -X GET http://localhost:4000/api/v1/auth/verify \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📌 Endpoints Disponíveis

### 🏷️ Tags
- **GET** `/api/v1/tags` - Listar todas as tags
- **GET** `/api/v1/tags/:id` - Obter tag específica
- **POST** `/api/v1/tags` - Criar nova tag (requer autenticação)
- **PUT** `/api/v1/tags/:id` - Atualizar tag (requer autenticação)
- **DELETE** `/api/v1/tags/:id` - Deletar tag (requer autenticação)

**Exemplo CREATE:**
```bash
curl -X POST http://localhost:4000/api/v1/tags \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "nome": "TypeScript"
  }'
```

---

### 📂 Categoria Vaga
- **GET** `/api/v1/categoria-vaga` - Listar todas as categorias
- **GET** `/api/v1/categoria-vaga/:id` - Obter categoria específica
- **POST** `/api/v1/categoria-vaga` - Criar nova categoria (requer autenticação)
- **PUT** `/api/v1/categoria-vaga/:id` - Atualizar categoria (requer autenticação)
- **DELETE** `/api/v1/categoria-vaga/:id` - Deletar categoria (requer autenticação)

**Exemplo CREATE:**
```bash
curl -X POST http://localhost:4000/api/v1/categoria-vaga \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "nome": "Desenvolvimento",
    "descricao": "Vagas de desenvolvimento de software"
  }'
```

---

### 💼 Vagas
- **GET** `/api/v1/vagas` - Listar todas as vagas (com categoria, publicador e tags)
- **GET** `/api/v1/vagas/:id` - Obter vaga específica
- **POST** `/api/v1/vagas` - Criar nova vaga (requer autenticação)
- **PUT** `/api/v1/vagas/:id` - Atualizar vaga (requer autenticação)
- **DELETE** `/api/v1/vagas/:id` - Deletar vaga (requer autenticação)

**Exemplo CREATE:**
```bash
curl -X POST http://localhost:4000/api/v1/vagas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "titulo": "Desenvolvedor Full Stack",
    "descricao": "Procuramos desenvolvedores experientes em Node.js e React",
    "requisitos": "3+ anos de experiência, conhecimento em Docker",
    "id_categoria": 1,
    "salario": 5000.00,
    "data_expiracao": "2024-06-30",
    "empresa": "Tech Company",
    "localizacao": "São Paulo, SP",
    "tags": [1, 2, 3]
  }'
```

---

### 🎉 Eventos
- **GET** `/api/v1/eventos` - Listar todos os eventos
- **GET** `/api/v1/eventos/:id` - Obter evento específico
- **POST** `/api/v1/eventos` - Criar novo evento (requer autenticação)
- **PUT** `/api/v1/eventos/:id` - Atualizar evento (requer autenticação)
- **DELETE** `/api/v1/eventos/:id` - Deletar evento (requer autenticação)

**Exemplo CREATE:**
```bash
curl -X POST http://localhost:4000/api/v1/eventos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "titulo": "Palestra de Tech",
    "descricao": "Palestra sobre tecnologias emergentes",
    "data_inicio": "2024-02-15T10:00:00",
    "data_fim": "2024-02-15T12:00:00",
    "localizacao": "Auditório Principal",
    "link_inscricao": "https://exemplo.com/inscricao"
  }'
```

---

### 📰 Notícias
- **GET** `/api/v1/noticias` - Listar todas as notícias
- **GET** `/api/v1/noticias/:id` - Obter notícia específica
- **POST** `/api/v1/noticias` - Criar nova notícia (requer autenticação)
- **PUT** `/api/v1/noticias/:id` - Atualizar notícia (requer autenticação)
- **DELETE** `/api/v1/noticias/:id` - Deletar notícia (requer autenticação)

**Exemplo CREATE:**
```bash
curl -X POST http://localhost:4000/api/v1/noticias \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "titulo": "Nova Bolsa de Estudo",
    "subtitulo": "Inscrições abertas",
    "conteudo": "O programa oferece bolsas para estudantes de excelência...",
    "imagem_url": "https://exemplo.com/imagem.jpg"
  }'
```

---

### 💡 Oportunidades
- **GET** `/api/v1/oportunidades` - Listar todas as oportunidades
- **GET** `/api/v1/oportunidades/:id` - Obter oportunidade específica
- **POST** `/api/v1/oportunidades` - Criar nova oportunidade (requer autenticação)
- **PUT** `/api/v1/oportunidades/:id` - Atualizar oportunidade (requer autenticação)
- **DELETE** `/api/v1/oportunidades/:id` - Deletar oportunidade (requer autenticação)

**Exemplo CREATE:**
```bash
curl -X POST http://localhost:4000/api/v1/oportunidades \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "titulo": "Programa de Intercâmbio",
    "descricao": "Oportunidade de estudar em universidades parceiras no exterior",
    "id_tipo_oportunidade": 1,
    "data_prazo": "2024-03-31",
    "link": "https://exemplo.com/intercambio"
  }'
```

---

### ℹ️ Informações
- **GET** `/api/v1/informacoes` - Listar todas as informações
- **GET** `/api/v1/informacoes/:id` - Obter informação específica
- **POST** `/api/v1/informacoes` - Criar nova informação (requer autenticação)
- **PUT** `/api/v1/informacoes/:id` - Atualizar informação (requer autenticação)
- **DELETE** `/api/v1/informacoes/:id` - Deletar informação (requer autenticação)

**Exemplo CREATE:**
```bash
curl -X POST http://localhost:4000/api/v1/informacoes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "chave": "contato_principal",
    "titulo": "Contato Principal",
    "descricao": "Email: contato@utfpr.edu.br, Tel: (44) 3310-1000"
  }'
```

---

## 🔐 Autenticação em Detalhes

Todos os endpoints de **criação (POST)**, **atualização (PUT)** e **deleção (DELETE)** requerem um token JWT válido.

**Padrão de Autenticação:**
```bash
Authorization: Bearer {token}
```

**Token JWT contém:**
- `id_usuario` - ID único do usuário
- `email` - Email do usuário
- `nome` - Nome do usuário
- `tipo_usuario` - Tipo (aluno, professor, admin)
- `iat` - Data de emissão
- `exp` - Data de expiração (8 horas)

---

## ⚙️ Estrutura Interna da API

```
/server/api/
├── controllers/
│   ├── apiControllers.js (7 entidades: tags, categoria_vaga, vagas, eventos, noticias, oportunidades, informacoes)
│   └── authController.js (login + verify)
└── routes/
    ├── auth.js
    ├── tags.js
    ├── categoriavaga.js
    ├── vagas.js
    ├── eventos.js
    ├── noticias.js
    ├── oportunidades.js
    └── informacoes.js
```

---

## 📊 Respostas Padrão

### Sucesso (2xx)
```json
{
  "success": true,
  "data": { ... },
  "message": "Operação realizada com sucesso"
}
```

### Erro (4xx/5xx)
```json
{
  "success": false,
  "error": "Descrição do erro"
}
```

### Lista Vazia
```json
{
  "success": true,
  "data": []
}
```

---

## 🧪 Testando com Postman/Insomnia

1. **Primeiro**: Faça login para obter o token
   - POST `/api/v1/auth/login`
   - Guarde o `token` da resposta

2. **Depois**: Use o token em todas as requisições
   - Header: `Authorization: Bearer {token}`
   - Execute suas operações CRUD

3. **Endpoints públicos** (sem autenticação):
   - GET `/api/v1/tags`
   - GET `/api/v1/categoria-vaga`
   - GET `/api/v1/vagas`
   - GET `/api/v1/eventos`
   - GET `/api/v1/noticias`
   - GET `/api/v1/oportunidades`
   - GET `/api/v1/informacoes`

---

## ✅ Status Atual

- ✅ 8 API routes criadas (auth + 7 entidades)
- ✅ 2 controllers API (auth + 7 entidades)
- ✅ Middleware JWT funcional
- ✅ Servidor rodando em http://localhost:4000
- ✅ Validações aplicadas a todas as operações
- ✅ Inclusões automáticas (relationships incluídas nas respostas GET)

---

## 🎯 Próximos Passos

- [ ] Integração com React Native (screens)
- [ ] Testes automatizados (Jest)
- [ ] Rate limiting
- [ ] Refresh token (melhorar segurança)
- [ ] Documentação Swagger/OpenAPI
