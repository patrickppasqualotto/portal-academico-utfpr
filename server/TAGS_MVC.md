# 🏷️ Tags MVC - Implementação Completa

## Arquivos Criados

### 1. **Controller** (`server/controllers/tagsController.js`)
- `index()` - Listar todas as tags (GET /tags)
- `new()` - Formulário de criação (GET /tags/new)
- `show()` - Visualizar tag específica (GET /tags/:id)
- `edit()` - Formulário de edição (GET /tags/:id/edit)
- `create()` - Criar nova tag com validação (POST /tags)
- `update()` - Atualizar tag com validação (PUT /tags/:id)
- `delete()` - Deletar tag (DELETE /tags/:id)

**Recursos:**
- Validação com `express-validator`
- Tratamento de erros
- Messages de sucesso/erro em sessão
- Ordenação alfabética

### 2. **Rotas** (`server/routes/tags.js`)
- Proteção com `requireSession` em todas as rotas
- Validação de entrada: nome (2-100 chars, caracteres específicos)
- Suporte para PUT/DELETE via formulário com `method-override`

**Validações implementadas:**
- Nome obrigatório
- Comprimento entre 2 e 100 caracteres
- Apenas letras, números, espaços, hífen e acentos

### 3. **Views EJS**

#### `server/views/tags/index.ejs`
- Listagem de todas as tags em tabela
- Botão "Nova Tag"
- Ações: Ver, Editar, Deletar (com confirmação)
- Exibe mensagens de sucesso/erro
- Estado vazio com chamada para ação

#### `server/views/tags/form.ejs`
- Formulário reutilizável para criação e edição
- Validação de erros exibida ao usuário
- Input com placeholder
- Botões Criar/Atualizar e Cancelar

#### `server/views/tags/show.ejs`
- Visualização de detalhes da tag
- Mostra: ID, Nome, Data de criação
- Botões: Editar, Deletar, Voltar

#### `server/views/error.ejs`
- Página de erro genérica
- Link para voltar ao início

## Dependências Instaladas

```json
{
  "express-validator": "^7.x.x",
  "method-override": "^3.x.x"
}
```

## Fluxo de Uso

### Criar Tag
1. GET `/tags/new` → Abre formulário
2. POST `/tags` com `nome` → Valida e cria
3. Redireciona para `/tags/:id` com mensagem de sucesso

### Listar Tags
- GET `/tags` → Tabela com todas as tags

### Ver Detalhes
- GET `/tags/:id` → Página de detalhe

### Editar Tag
1. GET `/tags/:id/edit` → Abre formulário
2. PUT `/tags/:id` com `nome` → Valida e atualiza
3. Redireciona para `/tags/:id` com mensagem de sucesso

### Deletar Tag
- DELETE `/tags/:id` com confirmação
- Redireciona para `/tags` com mensagem de sucesso

## Proteção de Rotas

Todas as rotas requerem sessão ativa (`requireSession`):
- Usuário não autenticado → Redireciona para `/web/login`
- Usuário autenticado → Acesso permitido

## Próximos Passos

1. Criar CRUD para **Categoria_vaga**
2. Criar CRUD para **Vaga** (com relação N:N com Tags)
3. Implementar rotas REST API (espelho do MVC)
4. Integrar Screens com API

