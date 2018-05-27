const validate = {};

validate.toBeUndefined = _funcWrapper((fn, value, error) => {
    const type = 'undefined';
    if (!value || value === undefined || typeof value === 'undefined') return value;
    else _throwError(fn, type, value, error);
});

validate.toBeDefined = _funcWrapper((fn, value, error) => {
    const type = 'any';
    if (value !== undefined && value !== null) return value;
    else _throwError(fn, type, value, error);
});

validate.toBeString = _funcWrapper((fn, value, error) => {
    const type = 'string';
    if (typeof value === type) return value;
    else _throwError(fn, type, value, error);
});

validate.toBeNumber = _funcWrapper((fn, value, error) => {
    const type = 'number';
    if (typeof value === type) return value;
    else _throwError(fn, type, value, error);
});

validate.toBeArray = _funcWrapper((fn, value, error) => {
    const type = 'array';
    if (Array.isArray(value)) return value;
    else _throwError(fn, type, value, error);
});

validate.toBeObject = _funcWrapper((fn, value, error) => {
    const type = 'object';
    if (!Array.isArray(value) && typeof value === 'object') return value;
    else _throwError(fn, type, value, error);
});

// don't like...
function _funcWrapper (callback) {
    return function (fn, isAsync) {
        if (typeof fn === 'function') {
            if (isAsync) {
                return async function () {
                    const e = new Error();
                    return callback(fn, await _processValue(fn, _processArgs(arguments)), e);
                }
            } else {
                return function () {
                    const e = new Error();
                    return callback(fn, _processValue(fn, _processArgs(arguments)), e);
                }
            }
        } else {
            const e = new Error();
            return callback(fn, _processValue(fn), e);
        }
    }
}

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
