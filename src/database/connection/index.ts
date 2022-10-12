import knex from 'knex';
import config from '../../../knexfile';
import generalLogger from '../../lib/logger';

const environment = process.env.NODE_ENV || 'development';

const connection = knex(config[environment]);

export const migrate = async () => {
  await connection.migrate.latest();
  generalLogger.info('Migration complete');
};
export default connection;
