const ideal = {};

ideal.toBeDefined = _defineFunction(
    'any',
    value => value !== undefined && value !== null,
    {}
);

ideal.toBeNumber = _defineFunction(
    'number',
    (value, type) => typeof value === type,
    {}
);

ideal.toBeString = _defineFunction(
    'string',
    (value, type) => typeof value === type,
    {}
);

ideal.toBeNumberAsync = _defineFunction(
    'number',
    (value, type) => typeof value === type,
    { async: true }
);

function _defineFunction (type, condition, defaultOptions) {
   return function (ctx, customOptions) {
       const options = Object.assign({}, defaultOptions, customOptions);

       if (options.async) {
           if (typeof ctx !== 'function') throw Error('Async context must be a function');

           return async function () {
               const value = await _processFunctionValue(ctx, _processArgs(arguments));
               if (condition(value, type)) return value;
               else _throwFunctionError(ctx.name, type, value, new Error());
           }
       } else if (typeof ctx === 'function') {
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

function _processPromiseValue (ctx, args) {
    console.log(ctx);
    return _processFunctionValue(ctx, args[0].then(result => result));
    // return ctx.call(null, ...args).then(result => result);
    // return ctx.then(result => result);
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
