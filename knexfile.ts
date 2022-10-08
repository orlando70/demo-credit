import type { Knex } from "knex";
import path from 'path';
import envConfig from './src/config'

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: envConfig.db.host,
      port: envConfig.db.port,
      user: envConfig.db.user,
      password: envConfig.db.password,
      database: envConfig.db.database,
    },
    migrations: {
      directory: path.resolve(__dirname, 'src','database/migrations'),
    },
  },
};

export default config;

