const ideal = {};

ideal.toBeAny = any;

///////////////////////////////////////////////////////////////////////////////////////
// LIBRARY
///////////////////////////////////////////////////////////////////////////////////////
function any () {
    let args = _processArgs(arguments);
    let _retval = _processValue(args);

    if (_retval !== undefined) return _retval;
    else throw Error(`Function '${args[0].name}' must return type 'any'`);
}

function _processValue (args) {
    let _fnArgs = [];

    if (args.length === 2) {
        if (Array.isArray(args[1])) {
            _fnArgs = args[1];
        } else {
            _fnArgs = [args[1]];
        }
    }

    if (args.length > 2) {
        _fnArgs = args.filter((val, i) => i !== 0);
    }

    if (typeof args[0] === 'function') {
        return args[0].call(null, ..._fnArgs);
    } else {
        return args[0];
    }
}

function _processArgs (args) {
    return [].slice.call(args);
}

///////////////////////////////////////////////////////////////////////////////////////
// TEST CODE
///////////////////////////////////////////////////////////////////////////////////////
function testFn (a, b) {
    return (a || 5) + (b || 6);
}

const result = ideal.toBeAny(testFn, 15);

console.log(result);
