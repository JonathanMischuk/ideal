const { processFunctionValue, processArgs } = require('../utils');
const { functionEvaluationTypeError } = require('../errors');

module.exports = (ctx, condition, type) => {
    if (typeof ctx !== 'function') throw Error('Async context must be a function');

    return async function () {
        const value = await processFunctionValue(ctx, processArgs(arguments));
        if (condition(value, type)) return value;
        else functionEvaluationTypeError(ctx.name, type, value, new Error());
    }
};
