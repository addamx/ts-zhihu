import config from 'config';

export const MONGO_PORT: number = config.get('MONGO_PORT');
export const MONGO_HOST: string = config.get('MONGO_HOST');
export const MONGO_DB_NAME: string = config.get('MONGO_DB_NAME');
export const MONGO_DB_USER: string = config.get('MONGO_DB_USER');
export const MONGO_DB_PASSWORD: string = config.get('MONGO_DB_PASSWORD');
export const REDIS_PORT: number = config.get('REDIS_PORT');
export const REDIS_HOST: string = config.get('REDIS_HOST');
export const SECRET: string = config.get('SECRET');
