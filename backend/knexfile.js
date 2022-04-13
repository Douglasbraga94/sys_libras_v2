// Update with your config settings.

module.exports = {

    client: 'postgresql',
    connection: {
      database: 'sys_libras',
      user:     'postgres',
      password: '0198'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }

};
