/**
 * Creates a js array from the passed in vector instance
 * @param {Vector} vec - Wasm vector
 * @return {Array} - Array representing the wasm vector
 */
function vecToArray(vec) {
    var size = vec.size();
    var result = [];
    for (var i = 0; i < size; i++) {
        result.push(vec.get(i));
    }
    return result;
}

/**
 * Generates valid arguments when calling the function
 * Throws an error if arguments are missing.
 * @param {*} args - Function arguments
 * @param {*} defaultArgs - The default arguments
 * @returns {*} arguments
 */
function argGen(args, defaultArgs = []) {
    var undefinedArgs = [];
    var args1 = [];
    var missingArgs = false;

    var keys = Object.keys(args);
    if (defaultArgs.length === 0) {
        for (let i = 0; i < keys.length; i++) {
            defaultArgs.push(REQUIRED);
        }
    }
    for (let k = 0; k < defaultArgs.length; k++) {
        var defaultArg = defaultArgs[k];
        if (defaultArg === REQUIRED && args[k] === undefined) {
            undefinedArgs.push(`arg${k}`);
            missingArgs = true;
        } else {
            args1[k] = args[k] !== undefined ? args[k] : defaultArg;
            if (args1[k] !== undefined && args1[k] !== null && args1[k].hasOwnProperty('prototype') && !missingArgs) {
                args1[k] = new args1[k]();
            }
        }
    }

    if (undefinedArgs.length > 0) {
        throw new Error(`Missing function arguments: ${undefinedArgs.toString()}`);
    }
    return args1;
}

function catchPtrError(func, handle, args, defaultArgs) {
    var funcName = func.name;
    try {
        var args1 = argGen(args, defaultArgs);
        return func.apply(handle, args1);
    } catch (exception) {
        throw new Error(`${funcName}: ${Module.getExceptionMessage(exception)}`);
    }
}

var REQUIRED = 'requiredArgument';

function wrapperFunction(func, defaultArgs = []) {
    return function() {
        var ret = catchPtrError(func, this, arguments, defaultArgs);
        // Convert the vector into an array.
        if (ret && ret.constructor && ret.constructor.name && ret.constructor.name.indexOf('vector') === 0) {
            ret = vecToArray(ret);
        }
        return ret;
    };
}

/**
 * Wraps the class prototype functions to catch ptr errors.
 * @param {*} klass
 */
function wrapperFactory(klass, funcArgOverride = {}) {
    var proto = klass.prototype;
    var funcNames = Object.keys(proto);
    for (var i = 0; i < funcNames.length; i++) {
        var funcName = funcNames[i];
        var apiFunc = proto[funcName];
        var defaultArgs = funcArgOverride[funcName];
        proto[funcName] = wrapperFunction(apiFunc, defaultArgs);
    }
    return klass;
}

var _wrappers;

function addWrapper(wrapperCb) {
    if (_wrappers === undefined) _wrappers = [];
    _wrappers.push(wrapperCb);
}

Module.onRuntimeInitialized = function() {
    var MaterialX = {};
    // Generate wrappers
    for (var i = 0; i < _wrappers.length; i++) {
        var wrapper = _wrappers[i];
        wrapper(Module, MaterialX);
    }
    Module['getMaterialX'] = function() {
        return MaterialX;
    };
};
