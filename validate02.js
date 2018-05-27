const validate = {};

// API - the dream
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
     return function (fn) {
         return function () {
             const error = new Error();
             const value = _processValue(fn, _processArgs(arguments));

             if (condition(value, type)) return value;
             else _throwError(fn, type, value, error);
         }
     }
}

async function _asyncWrapper (fn) {
    return await fn();
}

// validate.toBeUndefined = _defineFunction((fn, value, error) => {
//     const type = 'undefined';
//     if (!value || value === undefined || typeof value === 'undefined') return value;
//     else _throwError(fn, type, value, error);
// });
//
// validate.toBeDefined = _defineFunction((fn, value, error) => {
//     const type = 'any';
//     if (value !== undefined && value !== null) return value;
//     else _throwError(fn, type, value, error);
// });
//
// validate.toBeString = _defineFunction((fn, value, error) => {
//     const type = 'string';
//     if (typeof value === type) return value;
//     else _throwError(fn, type, value, error);
// });
//
// validate.toBeNumber = _defineFunction((fn, value, error) => {
//     const type = 'number';
//     if (typeof value === type) return value;
//     else _throwError(fn, type, value, error);
// });
//
// validate.toBeArray = _defineFunction((fn, value, error) => {
//     const type = 'array';
//     if (Array.isArray(value)) return value;
//     else _throwError(fn, type, value, error);
// });
//
// validate.toBeObject = _defineFunction((fn, value, error) => {
//     const type = 'object';
//     if (!Array.isArray(value) && typeof value === 'object') return value;
//     else _throwError(fn, type, value, error);
// });
//
// // don't like...
// function _defineFunction (callback) {
//     return function (fn, isAsync) {
//         if (typeof fn === 'function') {
//             if (isAsync) {
//                 return async function () {
//                     const e = new Error();
//                     return callback(fn, await _processValue(fn, _processArgs(arguments)), e);
//                 }
//             } else {
//                 return function () {
//                     const e = new Error();
//                     return callback(fn, _processValue(fn, _processArgs(arguments)), e);
//                 }
//             }
//         } else {
//             const e = new Error();
//             return callback(fn, _processValue(fn), e);
//         }
//     }
// }

function _processValue (fn, args) {
    if (typeof fn === 'function') return fn.call(null, ...args);
    else return fn;
}

function _processArgs (args) {
    return [].slice.call(args);
}

function _throwError (fn, type, value, error) {
    error.name = 'TypeError';

    if (typeof fn === 'function') {
        error.message = `Function '${fn.name || "anonymous"}' must return type '${type}', not type '${typeof value}'`;
        throw error.stack;
    } else {
        error.message = `Value ${value} must be of type '${type}', not type '${typeof value}'`;
        throw error.stack;
    }
}
