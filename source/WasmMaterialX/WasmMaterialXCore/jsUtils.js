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
    const funcName = func.name;
    try {
        return func.apply(handle, args);
    } catch (exception) {
        console.error(`${funcName}: ${Module.getExceptionMessage(exception)}`);
    }
}
