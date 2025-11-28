// bcrypt não será usado no modo sem criptografia
const { DataTypes } = require('sequelize');
const path = require('path');

// Subir dois níveis de __dirname (server/lib) para chegar à raiz
const { sequelize } = require(path.resolve(__dirname, '..', '..', 'Configuracao', 'database'));

// Importar modelo Usuario
const Usuario = require(path.resolve(__dirname, '..', '..', 'models', 'Usuario'))(sequelize, DataTypes);

/**
 * Valida credenciais do usuário contra o banco de dados
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object|null>} usuário sem senha ou null se inválido
 */
async function verifyCredentials(email, password) {
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return null;

    // Comparação direta (sem criptografia) - MODO DEMO
    if (usuario.senha !== password) return null;

    // Retornar usuário sem a senha
    return {
      id: usuario.id_usuario,
      name: usuario.nome,
      email: usuario.email,
      id_perfil: usuario.id_perfil,
      id_curso: usuario.id_curso
    };
  } catch (err) {
    console.error('Erro ao verificar credenciais:', err);
    return null;
  }
}

module.exports = { verifyCredentials };

/**
 * Busca usuário apenas por email (sem validar senha)
 * @param {string} email
 * @returns {Promise<Object|null>} usuário sem senha ou null se não encontrado
 */
async function findUserByEmail(email) {
  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return null;

    return {
      id: usuario.id_usuario,
      name: usuario.nome,
      email: usuario.email,
      id_perfil: usuario.id_perfil,
      id_curso: usuario.id_curso
    };
  } catch (err) {
    console.error('Erro ao buscar usuário por email:', err);
    return null;
  }
}

module.exports.findUserByEmail = findUserByEmail;
