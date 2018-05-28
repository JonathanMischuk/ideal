const { processFunctionValue, processArgs, throwFunctionError } = require('../utils');

module.exports = (ctx, condition, type) => {
    if (typeof ctx !== 'function') throw Error('Async context must be a function');

    return async function () {
        const value = await processFunctionValue(ctx, processArgs(arguments));
        if (condition(value, type)) return value;
        else throwFunctionError(ctx.name, type, value, new Error());
    }
};
