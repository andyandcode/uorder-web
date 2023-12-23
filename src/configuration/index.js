import environmentConfig from './enviromentConfig';
import { storageKey } from './storageKeys';

const isDevEnv = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const envConfig = isDevEnv ? environmentConfig.development : environmentConfig.production;
const endPointAdmin = 'http://192.168.0.102:90/';
const Config = {
    isDevEnv,
    storageKey,
    envConfig,
    endPointAdmin,
};

export default Config;
