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

function catchPtrError(func, handle, args) {
    var funcName = func.name;
    try {
        return func.apply(handle, args);
    } catch (exception) {
        console.error(`${funcName}: ${Module.getExceptionMessage(exception)}`);
    }
}

/**
 * Wraps the class prototype functions to catch ptr errors.
 * @param {*} klass 
 */
function wrapperFactory(klass) {
    var proto = klass.prototype;
    var funcNames = Object.keys(proto);
    for (var i = 0; i < funcNames.length; i++) {
        var funcName = funcNames[i];
        apiFunc = proto[funcName];
        function wrap(func) {
            return function() {
                return catchPtrError(func, this, arguments)
            }
        }
        proto[funcName] = wrap(apiFunc);
    }
    return klass;
}

function setupTest(fileName, callback) {
    console.log(`**************${fileName}**************`);
    callback && callback();
    console.log(`**************${'*'.repeat(fileName.length)}**************\n\n`);
}
