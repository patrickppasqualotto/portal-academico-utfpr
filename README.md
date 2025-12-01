# Portal Acadêmico UTFPR

Sistema completo de portal acadêmico com aplicativo mobile (React Native + Expo), API REST e interface web MVC para gerenciamento de conteúdo.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido para as disciplinas:
- **Dispositivos Móveis**: Aplicativo React Native com Expo
- **Programação Web 2**: Sistema MVC + API REST com autenticação JWT

### Funcionalidades

**📱 Aplicativo Mobile:**
- 5 seções principais: Informações, Notícias, Oportunidades, Vagas, Eventos
- Sistema de autenticação JWT
- Painel administrativo para cadastro de conteúdo
- Interface responsiva e intuitiva

**🌐 Sistema Web (MVC):**
- Interface administrativa com autenticação por sessão
- CRUD completo para todas as entidades
- Views em EJS com Bootstrap
- Validação de formulários

**🔌 API REST:**
- Endpoints JSON para integração mobile
- Autenticação JWT (Bearer Token)
- Documentação completa dos endpoints
- Validação de dados com express-validator

**💾 Banco de Dados:**
- PostgreSQL (Supabase)
- 6+ tabelas com relacionamentos 1:N e N:N
- Sequelize ORM
- Seeds para popular dados de teste

---

## 🚀 Guia de Instalação Completo

### Pré-requisitos

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **Expo Go** no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779))
- Conexão com **mesma rede Wi-Fi** entre computador e celular

---

## 📦 Instalação Passo a Passo

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/patrickppasqualotto/portal-academico-utfpr.git
cd portal-academico-utfpr
```

### 2️⃣ Instalar Dependências do Projeto Principal

⚠️ **IMPORTANTE:** Use o flag `--legacy-peer-deps` devido a conflitos de dependências:

```bash
npm install --legacy-peer-deps
```

**Depois, instale as dependências do servidor:**

```bash
cd server
npm install
cd ..
```

### Passo 3: Configurar Variáveis de Ambiente

O arquivo `.env` já existe na raiz do projeto com as configurações do banco de dados Supabase. Você precisa ajustar apenas a URL da API:

**Abra o arquivo `.env` na raiz do projeto e modifique:**

```env
# Mantenha estas variáveis do Supabase como estão:
DB_HOST=aws-0-us-west-2.pooler.supabase.com
DB_USER=postgres.iyyuwuuwguhsgcptijat
DB_PASS=celioeterno20232
DB_NAME=postgres
DB_PORT=5432
JWT_SECRET=chave_secreta_super_segura_utfpr_2024

# MODIFIQUE ESTA LINHA com o IP da sua máquina na rede local:
EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:4000
```

**Como descobrir seu IP local:**

- **Windows (PowerShell):**
  ```powershell
  ipconfig
  ```
  Procure por "Endereço IPv4" na seção "Adaptador de Rede sem Fio Wi-Fi" (algo como `192.168.0.x` ou `10.0.0.x`)

- **macOS/Linux:**
  ```bash
  ifconfig | grep "inet "
  ```
  ou
  ```bash
  ip addr show
  ```

**Exemplo de IP configurado:**
```env
EXPO_PUBLIC_API_URL=http://192.168.0.105:4000
```

### Passo 4: Configurar Firewall (Windows)

Se estiver no Windows, você precisa liberar a porta 4000 no firewall para que dispositivos móveis possam acessar o servidor.

**Execute como Administrador no PowerShell:**

```powershell
netsh advfirewall firewall add rule name="Node.js Server Port 4000" dir=in action=allow protocol=TCP localport=4000
```

### Passo 5: Iniciar o Servidor Backend

**Em um terminal, execute:**

```bash
cd server
npm start
```

Você deve ver:
```
✅ Conexão com o banco estabelecida com sucesso.
✅ Servidor rodando em http://localhost:4000
📱 Acesso da rede local: http://SEU_IP:4000
```

⚠️ **Mantenha este terminal aberto enquanto usa o app!**

### Passo 6: Iniciar o App Mobile

**Em outro terminal (na pasta raiz do projeto), execute:**

```bash
npx expo start --clear
```

O parâmetro `--clear` limpa o cache e garante que as variáveis de ambiente sejam carregadas.

### Passo 7: Abrir o App no Dispositivo

1. **Instale o Expo Go** no seu celular
2. **Conecte seu celular na mesma rede Wi-Fi** que o computador
3. **Escaneie o QR Code** que aparece no terminal:
   - **Android:** Use o app Expo Go para escanear
   - **iOS:** Use a câmera do iPhone para escanear

---

## 🔐 Credenciais de Teste

**Administrador:**
- Email: `admin@test.com`
- Senha: `admi!062025`

---

## 🛠️ Solução de Problemas

### Problema: "Network request failed" ao fazer login ou buscar dados

**Causa:** O app não consegue se conectar ao servidor backend.

**Soluções:**
1. Verifique se o servidor está rodando (veja Passo 5)
2. Confirme que seu celular está na mesma rede Wi-Fi do computador
3. Verifique se o IP no `.env` está correto (use `ipconfig` no Windows ou `ifconfig` no Mac/Linux)
4. Teste se o servidor está acessível abrindo no navegador do celular: `http://SEU_IP:4000`
5. Reinicie o app Expo com cache limpo: `npx expo start --clear`

### Problema: Erro ao instalar dependências

**Solução:** Use sempre `npm install --legacy-peer-deps` devido a conflitos de versão entre React Native e algumas bibliotecas.

### Problema: "Unable to resolve asset ./assets/icon.png"

**Solução:** Este é apenas um warning e não afeta a funcionalidade. Para corrigir, adicione um arquivo `icon.png` na pasta `assets/` ou remova a referência no `app.json`.

### Problema: Servidor não aceita conexões de outros dispositivos

**Causa:** Firewall bloqueando a porta 4000.

**Solução:** Execute como administrador:
```powershell
netsh advfirewall firewall add rule name="Node.js Server Port 4000" dir=in action=allow protocol=TCP localport=4000
```

### Problema: Dados não aparecem nas telas

**Causas possíveis:**
1. Servidor não está rodando
2. Variável `EXPO_PUBLIC_API_URL` no `.env` está incorreta
3. App não foi reiniciado após alterar o `.env`

**Solução:**
1. Verifique se o servidor está rodando
2. Confirme o IP no `.env`
3. Reinicie o Expo: `npx expo start --clear`
4. Recarregue o app (agite o celular e selecione "Reload")

---

## 📁 Estrutura do Projeto

```
portal-academico-utfpr/
├── components/          # Componentes React Native
│   ├── ui/             # Componentes de UI reutilizáveis
│   ├── CreateForms.tsx # Formulários de cadastro
│   ├── AdminPanel.tsx  # Painel administrativo
│   └── ...
├── contexts/           # Context API (Auth, Storage)
├── hooks/              # Custom hooks para buscar dados
├── models/             # Models Sequelize
├── screens/            # Telas principais do app
├── server/             # Backend Node.js + Express
│   ├── api/           # API REST v1
│   ├── controllers/   # Controllers MVC
│   ├── routes/        # Rotas da API
│   ├── lib/           # Serviços (auth)
│   ├── middleware/    # Middlewares (JWT)
│   └── views/         # Views EJS (MVC)
├── Configuracao/       # Configuração do banco (Sequelize)
├── .env               # Variáveis de ambiente
├── app.json           # Configuração Expo
└── package.json       # Dependências do projeto
```

---

## 🎓 Informações Acadêmicas

Este projeto foi desenvolvido para as disciplinas:

### Dispositivos Móveis
- Aplicação React Native totalmente funcional
- Conexão com banco de dados (Supabase/PostgreSQL)
- Autenticação de usuários
- CRUD completo de conteúdos

### Programação Web 2

**Parte 1 - Sistema MVC:**
- 6+ tabelas no banco relacional
- Relacionamentos 1:N e N:N
- Dois perfis de usuário (Admin e Usuário)
- CRUD 100% funcional
- Views EJS em `server/views/`

**Parte 2 - API REST:**
- API REST completa em `server/api/`
- Autenticação com tokens JWT
- Padrão REST implementado
- Documentação em `API_REST.md`
- Mesmas regras de acesso da Parte 1

---

## 📚 Documentação Adicional

- `API_REST.md` - Documentação completa da API
- `DOCUMENTACAO.md` - Documentação técnica do projeto
- `server/TAGS_MVC.md` - Documentação do sistema de tags

---

## 🤝 Contribuindo

Este é um projeto acadêmico. Para dúvidas ou sugestões, entre em contato com os desenvolvedores.

---

## 📄 Licença

Este projeto é de uso acadêmico para a UTFPR.





