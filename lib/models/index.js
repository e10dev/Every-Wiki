'use strict';

const env = process.env.NODE_ENV || 'development';
const path = require('path');

const fs = require('fs');
const Sequelize = require('sequelize');
const dbConfig = require('../../config/config.json')[env].db;

module.exports = {};
const models = module.exports;
const SpecialPermissions = require('../SpecialPermissions');

const sequelize = new Sequelize(
//  dbConfig.database,
//  dbConfig.username,
//  dbConfig.password,
  {
    logging: env === 'development' ? console.log : false,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    dialect: dbConfig.dialect,
    charset: dbConfig.charset,
    collate: dbConfig.collate,
    pool: dbConfig.pool,
    define: {
      freezeTableName: true,
    },
    operatorsAliases: false,
  },
);

models.sequelize = sequelize;

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (!['index.js', 'LibertyModel.js'].includes(file)))
  .forEach((file) => {
    // eslint-disable-next-line
    const model = require(path.join(__dirname, file));
    model.init(sequelize);
    models[model.name.charAt(0).toUpperCase() + model.name.slice(1)] = model;
  });

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate();
  }
});

models.install = async ({
  wikiName = 'Liberty Wiki',
  domain = 'localhost',
  adminUsername = 'liberty-root',
  adminPassword = 'password',
  frontPageName = 'front page',
  language = 'ko',
  license = 'OTHERS',
} = {}) => {
  await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
  await models.sequelize.sync({ force: true });
  await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
  await models.Setting.set('wikiName', wikiName);
  await models.Setting.set('domain', domain);
  await models.Setting.set('frontPage', frontPageName);
  await models.Setting.set('language', language);
  await models.Setting.set('license', license);
  const root = await models.Role.create({
    name: 'root',
  });
  const anonymous = await models.Role.create({
    name: 'anonymous',
  });
  const loggedIn = await models.Role.create({
    name: 'loggedIn',
  });
  const admin = await models.User.create({
    username: adminUsername, password: adminPassword, email: 'test@test.com',
  });
  await admin.addRole(root);
  for (const key of Object.keys(SpecialPermissions)) {
    await models.SpecialPermission.create({
      name: SpecialPermissions[key],
    });
  }
  await models.Namespace.create({
    id: 0,
    name: '(default)',
  });
  /* eslint-disable object-property-newline */
  await models.NamespacePermission.create({
    namespaceId: 0, roleId: anonymous.id,
    readable: true, creatable: true, editable: true,
  });
  await models.NamespacePermission.create({
    namespaceId: 0, roleId: loggedIn.id,
    readable: true, creatable: true, editable: true, renamable: true,
  });
  await models.Namespace.create({
    id: 2,
    name: '사용자',
  });
  await models.NamespacePermission.create({
    namespaceId: 2, roleId: anonymous.id,
    readable: true, creatable: true, editable: true,
  });
  await models.NamespacePermission.create({
    namespaceId: 2, roleId: loggedIn.id,
    readable: true, creatable: true, editable: true, renamable: true,
  });
  await models.Namespace.create({
    id: 4,
    name: wikiName,
  });
  await models.NamespacePermission.create({
    namespaceId: 4, roleId: anonymous.id,
    readable: true, creatable: true, editable: true,
  });
  await models.NamespacePermission.create({
    namespaceId: 4, roleId: loggedIn.id,
    readable: true, creatable: true, editable: true, renamable: true,
  });
  await models.Namespace.create({
    id: 6,
    name: '파일',
  });
  await models.NamespacePermission.create({
    namespaceId: 6, roleId: anonymous.id,
    readable: true,
  });
  await models.NamespacePermission.create({
    namespaceId: 6, roleId: loggedIn.id,
    readable: true, creatable: true, editable: true, renamable: true,
  });
  await models.Namespace.create({
    id: 10,
    name: '틀',
  });
  await models.NamespacePermission.create({
    namespaceId: 10, roleId: anonymous.id,
    readable: true, creatable: true, editable: true,
  });
  await models.NamespacePermission.create({
    namespaceId: 10, roleId: loggedIn.id,
    readable: true, creatable: true, editable: true, renamable: true,
  });
  await models.Namespace.create({
    id: 14,
    name: '분류',
  });
  await models.NamespacePermission.create({
    namespaceId: 14, roleId: anonymous.id,
    readable: true, creatable: true, editable: true,
  });
  await models.NamespacePermission.create({
    namespaceId: 14, roleId: loggedIn.id,
    readable: true, creatable: true, editable: true, renamable: true,
  });
  /* eslint-enable object-property-newline */
};

models.initialize = async () => {
  await models.Role.initialize();
  await models.User.initialize();
  await models.Namespace.initialize();
  await models.Setting.initialize();
  await models.SpecialPermission.initialize();
  await models.Revision.initialize();
};