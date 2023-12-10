import Cookies from 'universal-cookie';
import Config from '../configuration';

const getValues = (source, variables = '', fallbackValue = false, allowNull = false) => {
    const targetValueHierarchy = (variables || '')
        .toString()
        .replace(/[[\]]/g, '.')
        .split('.')
        .filter((key) => key !== '');

    if (source === null && allowNull && targetValueHierarchy.length === 0) {
        return null;
    }

    // Check for string type because string is subtype of Array
    // Don't worry, if the data type not an object or array will fail after that.
    if (!source || ['string, boolean'].includes(typeof source)) {
        return fallbackValue;
    }

    // Retain data type cause data type is dynamic
    let result = Object.assign(source);

    for (let i = 0; i < targetValueHierarchy.length; i++) {
        result = result[targetValueHierarchy[i]];

        if (result === undefined) {
            break;
        }

        if (result === null && i !== targetValueHierarchy.length - 1) {
            result = undefined;
            break;
        }
    }

    if (result === null) {
        return allowNull ? result : fallbackValue;
    }

    return result !== undefined ? result : fallbackValue;
};

const getAccessToken = () => {
    const cookies = new Cookies();
    const jwt = cookies.get(Config.storageKey.tokenKey);
    if (jwt) {
        return jwt;
    }
    return false;
};

const convertToNumber = (value) => {
    return parseInt(value.toString().replace(/[^0-9]/g, ''));
};

const Utils = { getValues, getAccessToken, convertToNumber };

export default Utils;
