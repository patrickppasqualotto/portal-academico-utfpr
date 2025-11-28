# Portal Acadêmico UTFPR — Documentação

## 1. Visão Geral

Sistema web de portal acadêmico com:
- **Parte 1 (MVC)**: Interface web com autenticação por sessão para administração de conteúdo
- **Parte 2 (API REST)**: Endpoints JSON com autenticação JWT para integração com mobile
- **Parte 3 (Mobile)**: Aplicativo React Native Expo para consumo de APIs

## 2. Stack Tecnológico

- **Backend**: Node.js + Express.js
- **Banco de Dados**: PostgreSQL (Supabase)
- **ORM**: Sequelize
- **Autenticação MVC**: express-session + connect-pg-simple
- **Autenticação API**: JWT
- **View Engine**: EJS
- **Validação**: express-validator

## 3. Arquitetura de Pastas

```
portal-academico-utfpr/
├── server/
│   ├── controllers/       # Lógica de negócio CRUD
│   ├── routes/           # Definição de rotas e validações
│   ├── views/            # Templates EJS
│   ├── middleware/       # Middlewares (autenticação)
│   └── server.js         # Aplicação Express principal
├── models/               # Modelos Sequelize
├── Configuracao/         # Conexão com BD
├── seed.js              # Script de seed de dados
├── App.tsx              # App principal React Native
└── DOCUMENTACAO.md      # Este arquivo
```

## 4. Diagrama ER (Entidade-Relacionamento)

```
┌─────────────┐
│  Usuario    │
│─────────────│
│ id_usuario  │ (PK)
│ nome        │
│ email       │ (unique)
│ senha       │ (bcrypt)
│ id_perfil   │ (FK → Perfis)
│ id_curso    │ (FK → Curso)
└─────────────┘
      ▲
      │ 1:N
      │
      ├──────────────────────────────┬──────────────────────┐
      │                              │                      │
   ┌──────────┐              ┌────────────┐         ┌──────────┐
   │ Noticia  │              │  Evento    │         │   Vaga   │
   ├──────────┤              ├────────────┤         ├──────────┤
   │id_noticia│              │id_evento   │         │id_vaga   │
   │titulo    │              │titulo      │         │titulo    │
   │conteudo  │              │descricao   │         │descricao │
   │id_autor  │ (FK)         │data_inicio │         │id_usuario│ (FK)
   │data_pub  │              │data_fim    │         │id_categ  │ (FK)
   └──────────┘              │id_usuario  │ (FK)   └──────────┘
                             │id_curso    │ (FK)        │
                             └────────────┘             │ N:N
                                                        │
                              ┌─────────────────────────┴────────┐
                              │                                  │
                         ┌──────────────┐           ┌────────────────┐
                         │    Tags      │           │   Vaga_Tags    │
                         ├──────────────┤           ├────────────────┤
                         │ id_tag       │ (PK)      │ id_vaga        │ (FK)
                         │ nome         │           │ id_tag         │ (FK)
                         └──────────────┘           └────────────────┘

┌──────────────┐          ┌──────────────┐
│ Perfis       │          │ Curso        │
├──────────────┤          ├──────────────┤
│ id_perfil    │ (PK)     │ id_curso     │ (PK)
│ nome         │          │ nome         │
└──────────────┘          │ id_inst      │ (FK)
                          └──────────────┘
                                 ▲
                                 │ N:1
                          ┌──────────────┐
                          │ Instituicao  │
                          ├──────────────┤
                          │ id_inst      │ (PK)
                          │ nome         │
                          └──────────────┘

┌──────────────────┐       ┌──────────────────┐
│ Categoria_vaga   │       │  Oportunidade    │
├──────────────────┤       ├──────────────────┤
│ id_categoria     │ (PK)  │ id_oportunidade  │ (PK)
│ nome             │───────│ id_tipo_opor     │ (FK)
│ descricao        │       │ titulo           │
└──────────────────┘       │ descricao        │
                           │ data_prazo       │
                           │ link             │
                           └──────────────────┘
                                  ▲
                                  │ N:1
                           ┌──────────────────┐
                           │ TipoOportunidade │
                           ├──────────────────┤
                           │ id_tipo_opor     │ (PK)
                           │ nome             │
                           └──────────────────┘

┌──────────────┐
│ Informacoes  │
├──────────────┤
│ id_informacoes│ (PK)
│ chave        │
│ titulo       │
│ descricao    │
│ ultima_att   │
└──────────────┘
```

## 5. Entidades Implementadas (MVC)

### 5.1 Tags
- **Rota Base**: `/tags`
- **Descrição**: Palavras-chave para categorizar vagas
- **Campos**: `id_tag`, `nome` (único)
- **Operações**: Listar, criar, editar, deletar
- **Autenticação**: Criar/editar/deletar requerem sessão

### 5.2 Categoria_vaga
- **Rota Base**: `/categoria-vaga`
- **Descrição**: Categorias de vagas (Estágio, Trainee, Júnior, etc.)
- **Campos**: `id_categoria`, `nome`, `descricao`
- **Operações**: CRUD completo
- **Autenticação**: Requer sessão para escrever

### 5.3 Vagas
- **Rota Base**: `/vagas`
- **Descrição**: Oportunidades de emprego/estágio
- **Campos**: `id_vaga`, `titulo`, `descricao`, `requisitos`, `salario`, `data_expiracao`, `id_categoria`, `id_usuario`, `empresa`, `localizacao`, `url_externa`
- **Relações**: 
  - N:1 com `Categoria_vaga`
  - N:1 com `Usuario` (publicador)
  - N:N com `Tags` (via `Vaga_Tags`)
- **Operações**: CRUD + seleção múltipla de tags
- **Autenticação**: Requer sessão para escrever

### 5.4 Eventos
- **Rota Base**: `/eventos`
- **Descrição**: Eventos acadêmicos (palestras, workshops, etc.)
- **Campos**: `id_evento`, `titulo`, `descricao`, `data_inicio`, `data_fim`, `localizacao`, `link_inscricao`, `id_usuario`, `id_curso`
- **Relações**: N:1 com `Usuario`, N:1 com `Curso` (opcional)
- **Validações**: `data_inicio` futuro, `data_fim` > `data_inicio`
- **Autenticação**: Requer sessão para escrever

### 5.5 Notícias
- **Rota Base**: `/noticias`
- **Descrição**: Notícias e comunicados do portal
- **Campos**: `id_noticia`, `titulo`, `subtitulo`, `conteudo`, `imagem_url`, `data_publicacao`, `data_expiracao`, `id_autor`
- **Relações**: N:1 com `Usuario` (autor)
- **Validações**: Conteúdo 10-5000 caracteres
- **Autenticação**: Requer sessão para escrever

### 5.6 Oportunidades
- **Rota Base**: `/oportunidades`
- **Descrição**: Oportunidades diversas (bolsas, projetos, etc.)
- **Campos**: `id_oportunidade`, `titulo`, `descricao`, `data_publicacao`, `data_prazo`, `id_tipo_oportunidade`, `link`
- **Relações**: N:1 com `TipoOportunidade`
- **Validações**: Título 5-200, Descrição 10-3000
- **Autenticação**: Requer sessão para escrever

### 5.7 Informacoes
- **Rota Base**: `/informacoes`
- **Descrição**: Informações gerais e configurações do portal
- **Campos**: `id_informacoes`, `chave`, `titulo`, `descricao`, `ultima_att`
- **Operações**: CRUD completo
- **Autenticação**: Requer sessão para escrever

## 6. Endpoints MVC (HTML + Sessão)

### Padrão para cada entidade:

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/entidade` | Listar todas | Não |
| GET | `/entidade/new` | Formulário criar | Sessão ✓ |
| GET | `/entidade/:id` | Detalhes | Não |
| GET | `/entidade/:id/edit` | Formulário editar | Sessão ✓ |
| POST | `/entidade` | Criar | Sessão ✓ |
| PUT | `/entidade/:id` | Atualizar | Sessão ✓ |
| DELETE | `/entidade/:id` | Deletar | Sessão ✓ |

### Entidades com endpoints MVC implementados:

- ✅ `/tags` — CRUD completo
- ✅ `/categoria-vaga` — CRUD completo
- ✅ `/vagas` — CRUD completo (com N:N tags)
- ✅ `/eventos` — CRUD completo
- ✅ `/noticias` — CRUD completo
- ✅ `/oportunidades` — CRUD completo
- ✅ `/informacoes` — CRUD completo

### Rotas de Autenticação:

| Rota | Descrição |
|------|-----------|
| `GET /web/login` | Formulário login |
| `POST /web/login` | Processar login |
| `GET /web/dashboard` | Dashboard autenticado |
| `GET /web/logout` | Logout |

## 7. Fluxo de Autenticação

### MVC (Sessão-based):
1. Usuário acessa `/web/login`
2. Submete email + senha (POST)
3. Backend valida contra BD (bcrypt)
4. Cria sessão: `req.session.user = { id_usuario, email, nome, id_perfil }`
5. Armazena sessão em tabela Postgres
6. Cookie `connect.sid` é enviado ao navegador
7. Requests subsequentes incluem cookie → sessão válida
8. Logout destroi sessão

### API REST (JWT):
1. Cliente POST `/auth/login` com `{ email, senha }`
2. Backend retorna token JWT (validade 8h)
3. Cliente inclui header: `Authorization: Bearer <token>`
4. Backend valida assinatura do token
5. Se válido, continua; senão, 401 Unauthorized

## 8. Exemplo de Uso — Criar uma Vaga (MVC)

### Passo 1: Acessar formulário
```
GET http://localhost:4000/vagas/new
→ Redireciona para /web/login (se não autenticado)
```

### Passo 2: Fazer login
```
GET http://localhost:4000/web/login
POST http://localhost:4000/web/login
  Body: { email: "admin@utfpr.edu.br", senha: "senha123" }
  → Cria sessão, redireciona para /vagas/new
```

### Passo 3: Preencher formulário
```
GET http://localhost:4000/vagas/new
→ Renderiza form.ejs com campos:
  - titulo (5-200 chars)
  - descricao (10-2000 chars)
  - requisitos (10-2000 chars)
  - salario (float)
  - data_expiracao (ISO8601, futuro)
  - categoria (select)
  - empresa (string)
  - localizacao (string)
  - url_externa (URL válida)
  - tags (multi-select checkboxes)
```

### Passo 4: Submeter
```
POST http://localhost:4000/vagas
  Body: FormData
    titulo: "Desenvolvedor Frontend"
    descricao: "..."
    categoria: 1
    tags: [1, 3, 5]  (ids das tags)
    ...
  → Se válido: Cria vaga, redireciona para /vagas/{id}, exibe sucesso
  → Se inválido: Re-renderiza form com erros
```

## 9. Estrutura de Validação

### Validações por Entidade:

**Tags:**
- Nome: 2-100 caracteres, caracteres portugueses permitidos

**Categoria_vaga:**
- Nome: 2-100 caracteres
- Descrição: 0-500 caracteres (opcional)

**Vagas:**
- Título: 5-200 caracteres
- Descrição: 10-2000 caracteres
- Requisitos: 10-2000 caracteres
- Salário: Float ≥ 0 (opcional)
- Data Expiração: Data futura (obrigatória)
- Categoria: Int válido (obrigatória)
- Tags: 2+ selecionadas (recomendado)

**Eventos:**
- Título: Genérico
- Data Início: Data futura (obrigatória)
- Data Fim: Opcional, mas > data_inicio se preenchida
- Curso: Int válido (opcional)

**Notícias:**
- Título: 5-200 caracteres
- Conteúdo: 10-5000 caracteres
- Imagem URL: URL válida (opcional)
- Data Expiração: ISO8601 (opcional)

**Oportunidades:**
- Título: 5-200 caracteres
- Descrição: 10-3000 caracteres
- Tipo: Int válido (obrigatória)
- Data Prazo: ISO8601 (opcional)
- Link: URL válida (opcional)

**Informacoes:**
- Chave: 2+ caracteres
- Título: 3+ caracteres
- Descrição: 3+ caracteres

## 10. Estrutura de Resposta (Mensagens)

### Sucesso (POST/PUT/DELETE):
```
req.session.message = {
  type: 'success',
  text: '✅ Entidade "Nome" criada com sucesso!'
}
→ Redireciona para detalhe (/entidade/{id})
→ View exibe alerta verde com mensagem
```

### Erro (Validação):
```
res.status(400).render('entidade/form', {
  ...,
  errors: [
    { msg: 'Título deve ter entre 5 e 200 caracteres' },
    { msg: 'Categoria inválida' }
  ]
})
→ Re-renderiza form com alert vermelho
```

## 11. Dados de Teste

### Seed Script
```bash
npm run seed
```
Popula o banco com:
- 100 usuários de teste (emails: user001@utfpr.edu.br ... user100@utfpr.edu.br)
- Senhas: `senha123` (bcrypt hash)
- Perfis padrão (admin, professor, aluno)
- Cursos (Engenharia, Administração, etc.)

## 12. Variáveis de Ambiente (.env)

```env
# Banco de Dados (Supabase PostgreSQL)
DB_HOST=
DB_PORT=5432
DB_USER=
DB_PASS=
DB_NAME=

# Servidor
PORT_SERVER=4000
SESSION_SECRET=chave-secreta-mudcar-producao
JWT_SECRET=jwt-secret-mudar-producao
```

## 13. Próximos Passos (Parte 2 — API REST)

Após finalizar testes MVC, criar:
1. Controllers API (retornam JSON em vez de render HTML)
2. Rotas `/api/v1/` com JWT
3. Validações idênticas ao MVC
4. Exemplos curl para cada endpoint
5. Swagger/OpenAPI (opcional)

## 14. Contato e Suporte

- **Desenvolvedor**: [Seu Nome]
- **Projeto**: Portal Acadêmico UTFPR
- **Data de Criação**: Novembro 2025
- **Versão**: 1.0.0 (Fase 1 — MVC concluída)
