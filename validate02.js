const validate = {};

validate.toBeDefined = _defineFunction(
    'any',
    value => value !== undefined && value !== null
);

validate.toBeNumber = _defineFunction(
    'number',
    (value, type) => typeof value === type
);

validate.toBeString = _defineFunction(
    'string',
    (value, type) => typeof value === type
);

function _defineFunction (type, condition) {
     return function (ctx) {
         if (typeof ctx === 'function') {
             return function () {
                 const value = _processFunctionValue(ctx, _processArgs(arguments));
                 if (condition(value, type)) return value;
                 else _throwFunctionError(ctx.name, type, value, new Error());
             }
         }

         if (condition(ctx, type)) return ctx;
         else _throwError(type, ctx, new Error());
     }
}

function _processFunctionValue (ctx, args) {
    return ctx.call(null, ...args);
}

function _processArgs (args) {
    return [].slice.call(args);
}

function _throwError (type, value, error) {
    error.name = 'TypeError';
    error.message = `Value ${value} must be of type '${type}', not type '${typeof value}'`;
    throw error.stack;
}

function _throwFunctionError (name, type, value, error) {
    error.name = 'TypeError';
    error.message = `Function '${name || "anonymous"}' must return type '${type}', not type '${typeof value}'`;
    throw error.stack;
}
