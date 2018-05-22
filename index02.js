///////////////////////////////////////////////////////////////////////////////////////
// LIBRARY - Abstraction seems confusing...
///////////////////////////////////////////////////////////////////////////////////////
const validate = {};

validate.toBeDefined = _funcWrapper((fn, value) => {
    const type = 'any';
    if (value !== undefined && value !== null) return value;
    else _throwError(fn, type, value);
});

validate.toBeString = _funcWrapper((fn, value) => {
    const type = 'string';
    if (typeof value === type) return value;
    else _throwError(fn, type, value);
});

validate.toBeNumber = _funcWrapper((fn, value) => {
    const type = 'number';
    if (typeof value === type) return value;
    else _throwError(fn, type, value);
});

// don't like...
function _funcWrapper (callback) {
    return function (fn, isAsync) {
        if (isAsync) {
            return async function () {
                return callback(fn, await _processValue(fn, _processArgs(arguments)));
            }
        } else {
            return function () {
                return callback(fn, _processValue(fn, _processArgs(arguments)));
            }
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

function _throwError (fn, type, value) {
    throw Error(`Function '${fn.name}' must return type '${type}', not type '${typeof value}`).stack;
}

///////////////////////////////////////////////////////////////////////////////////////
// TEST CODE
///////////////////////////////////////////////////////////////////////////////////////
const fnString = validate.toBeString(function fnString (more) {
    // return 5;
    return 'this is a string' + more;
});

const fnNumber = validate.toBeNumber(function fnNumber (a, b) {
    return (a || 5) + (b || 6);
});

const fnPromise = validate.toBeNumber(function fnPromise () {
    return new Promise(resolve => {
        resolve(5);
    });
}, true);

const result01 = fnString(', plus much, much more!');
const result02 = fnNumber(15, 12);
const result03 = fnPromise();

console.log(result01);
console.log(result02);

result03.then(result => {
    console.log(result);
});
