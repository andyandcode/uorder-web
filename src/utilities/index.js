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

const Utils = { getValues };

export default Utils;
