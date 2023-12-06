import environmentConfig from './enviromentConfig';
import { storageKey } from './storageKeys';

const isDevEnv = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
console.log(isDevEnv);
const envConfig = isDevEnv ? environmentConfig.development : environmentConfig.production;
const endPointAdmin = 'https://localhost:7297';
const Config = {
    isDevEnv,
    storageKey,
    envConfig,
    endPointAdmin,
};

export default Config;
