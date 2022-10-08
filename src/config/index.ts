import env from 'dotenv';

env.config({
  path: process.env.ENV_FILE_PATH,
});

export enum AppEnvironmentEnum {
  TEST = 'test',
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

type Config = {
  env: {
    isProduction: boolean;
    isDevelopment: boolean;
    isTest: boolean;
  };
  app: {
    env: AppEnvironmentEnum;
    secret: string;
    bcryptRounds: number;
    port: number;
  };
  db: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
  paystack: {
    secretKey: string;
    baseUrl: string;
    preAuthorizationFee: number;
  };
};

const isTestEnvironment = process.env.APP_ENV === AppEnvironmentEnum.TEST;

const config: Config = {
  env: {
    isProduction: process.env.NODE_ENV === AppEnvironmentEnum.PRODUCTION,
    isDevelopment: process.env.NODE_ENV === AppEnvironmentEnum.DEVELOPMENT,
    isTest: process.env.NODE_ENV === AppEnvironmentEnum.TEST,
  },
  app: {
    env: process.env.APP_ENV as AppEnvironmentEnum,
    secret: process.env.APP_SECRET!,
    bcryptRounds: 10,
    port: +process.env.PORT!,
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT || 3306),
    database: isTestEnvironment ? process.env.TEST_DB_DATABASE! : process.env.DB_DATABASE!,
    user: isTestEnvironment ? process.env.TEST_DB_USER! : process.env.DB_USER!,
    password: isTestEnvironment ? process.env.TEST_DB_PASSWORD! : process.env.DB_PASSWORD!,
  },
  paystack: {
    secretKey: process.env.PAYSTACK_SECRET_KEY!,
    baseUrl: process.env.PAYSTACK_API_BASE_URL!,
    preAuthorizationFee: 1000,
  }
};

const validateConfig = () => {
  const missingKeys: string[] = [];
  Object.entries(config).forEach(([baseKey, baseValue]) => {
    Object.entries(baseValue).forEach(([key, value]) => {
      if (value === '' || value === undefined) {
        missingKeys.push(`${baseKey}.${key}`);
      }
    });
  });
  if (missingKeys.length) {
    global.console.error(`The following configuration keys are not set: ${missingKeys.join(', ')}`);
    process.exit(1);
  }
};

validateConfig();

export default config;
