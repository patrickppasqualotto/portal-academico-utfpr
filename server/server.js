// Load root .env so Configuracao/database.js picks up the same env vars
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const methodOverride = require('method-override');

// MVC Routes
const authRoutes = require('./routes/auth');
const webAuthRoutes = require('./routes/webAuth');
const tagsRoutes = require('./routes/tags');
const categoriavagaRoutes = require('./routes/categoria-vaga');
const vagasRoutes = require('./routes/vagas');
const eventosRoutes = require('./routes/eventos');
const noticiasRoutes = require('./routes/noticias');
const oportunidadesRoutes = require('./routes/oportunidades');
const informacoesRoutes = require('./routes/informacoes');

// API Routes (v1)
const apiAuthRoutes = require('./api/routes/auth');
const apiTagsRoutes = require('./api/routes/tags');
const apiCategoriaVagaRoutes = require('./api/routes/categoriavaga');
const apiVagasRoutes = require('./api/routes/vagas');
const apiEventosRoutes = require('./api/routes/eventos');
const apiNoticiasRoutes = require('./api/routes/noticias');
const apiOportunidadesRoutes = require('./api/routes/oportunidades');
const apiInformacoesRoutes = require('./api/routes/informacoes');

const { testarConexao } = require('../Configuracao/database');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Suporta PUT/DELETE em formulários HTML

// Session configuration (usando memória temporariamente para evitar problemas de conexão)
// NOTA: Para produção, deve-se usar PgSession com pool de conexões separado
const sessionConfig = {
  // Comentado temporariamente devido a erro de pool de conexões
  // store: new PgSession({
  //   conString: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  //   createTableIfMissing: true
  // }),
  secret: process.env.SESSION_SECRET || 'troque_para_uma_chave_secreta_em_producao',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 8 * 60 * 60 * 1000, // 8 horas
    httpOnly: true,
    secure: false, // mude para true se usar HTTPS em produção
    sameSite: 'lax'
  }
};

app.use(session(sessionConfig));

// Rotas
app.use('/auth', authRoutes);              // API (JSON + JWT)
app.use('/web', webAuthRoutes);            // MVC (HTML + sessão)
app.use('/tags', tagsRoutes);              // MVC Tags CRUD
app.use('/categoria-vaga', categoriavagaRoutes);  // MVC Categorias CRUD
app.use('/vagas', vagasRoutes);            // MVC Vagas CRUD
app.use('/eventos', eventosRoutes);        // MVC Eventos CRUD
app.use('/noticias', noticiasRoutes);      // MVC Notícias CRUD
app.use('/oportunidades', oportunidadesRoutes);  // MVC Oportunidades CRUD
app.use('/informacoes', informacoesRoutes); // MVC Informações CRUD

// API v1 Routes (JSON + JWT)
app.use('/api/v1/auth', apiAuthRoutes);
app.use('/api/v1/tags', apiTagsRoutes);
app.use('/api/v1/categoria-vaga', apiCategoriaVagaRoutes);
app.use('/api/v1/vagas', apiVagasRoutes);
app.use('/api/v1/eventos', apiEventosRoutes);
app.use('/api/v1/noticias', apiNoticiasRoutes);
app.use('/api/v1/oportunidades', apiOportunidadesRoutes);
app.use('/api/v1/informacoes', apiInformacoesRoutes);

// Rota raiz (info)
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Portal Acadêmico UTFPR - Servidor de Autenticação',
    endpoints: {
      api: {
        login: 'POST /auth/login (JSON) → retorna JWT'
      },
      mvc: {
        login: 'GET /web/login (HTML form)',
        dashboard: 'GET /web/dashboard (protegido)',
        logout: 'GET /web/logout'
      }
    }
  });
});

const PORT = process.env.PORT_SERVER || 4000;
const HOST = '0.0.0.0'; // Permite conexões de qualquer interface de rede

testarConexao().then(() => {
  const server = app.listen(PORT, HOST, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
    console.log(`📱 Acesso da rede local: http://10.0.0.154:${PORT}`);
  });
  
  server.on('error', (err) => {
    console.error('❌ Erro no servidor:', err);
    process.exit(1);
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promise rejeitada sem tratamento:', reason);
  });
  
}).catch((err) => {
  console.error('Erro ao iniciar servidor:', err);
  process.exit(1);
});
