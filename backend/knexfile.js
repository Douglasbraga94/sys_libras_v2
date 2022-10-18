// Update with your config settings.
const { db, searchPath } = require('./.env')
module.exports = {

    client: 'postgresql',
    connection: db,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }, 
    searchPath: searchPath

};
