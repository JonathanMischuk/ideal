const { processFunctionValue, processArgs } = require('../utils');
const { valueTypeError, functionEvaluationTypeError } = require('../errors');

module.exports = (ctx, condition, type) => {
    if (typeof ctx === 'function') {
        return function () {
            const value = processFunctionValue(ctx, processArgs(arguments));
            if (condition(value, type)) return value;
            else functionEvaluationTypeError(ctx.name, type, value, new Error());
        }
    }

    if (condition(ctx, type)) return ctx;
    else valueTypeError(type, ctx, new Error());
};
