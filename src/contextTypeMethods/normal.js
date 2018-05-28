const utils = require('../utils');

module.exports = (ctx, condition, type) => {
    if (typeof ctx === 'function') {
        return function () {
            const value = utils.processFunctionValue(ctx, utils.processArgs(arguments));
            if (condition(value, type)) return value;
            else utils.throwFunctionError(ctx.name, type, value, new Error());
        }
    }

    if (condition(ctx, type)) return ctx;
    else utils.throwError(type, ctx, new Error());
};
