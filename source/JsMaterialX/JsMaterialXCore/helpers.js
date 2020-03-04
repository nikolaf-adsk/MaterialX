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
                return catchPtrError(func, this, arguments);
            };
        }
        proto[funcName] = wrap(apiFunc);
    }
    return klass;
}

class Validator {
    constructor(fileName) {
        this.fileName = fileName;
        this.validators = [];
    }

    validate() {
        console.log(`**************${this.fileName}**************`);
        for (var i = 0; i < this.validators.length; i++) {
            var validator = this.validators[i];
            if (validator) {
                validator();
            }
        }
        console.log(`**************${'*'.repeat(this.fileName.length)}**************\n\n`);
    }

    output(callback) {
        if (!callback) return;
        var callStr = callback.toString();
        callStr = callStr.split('function() {')[1];
        callStr = callStr.substring(0, callStr.length - 1);
        callStr = callStr.trim();
        var commands = callStr.split(';');
        for (var i = 0; i < commands.length - 1; i++) {
            var command = commands[i].trim();
            var geval = eval;
            var output =
                command.indexOf('//') === 0
                    ? `/**Commented out*/ ${command};`
                    : `${command}; // returned: ${geval(command)}`;
            console.log(`   ${output}`);
        }
    }

    classValidatorCb(className, validateInstanceCb, validateConstantsCb) {
        var func = function() {
            console.log(`------Validating ${className} instance`);
            this.output(validateInstanceCb);
            console.log(`------Validating ${className} Constants`);
            this.output(validateConstantsCb);
        }.bind(this, className, validateInstanceCb, validateConstantsCb);
        this.validators.push(func);
    }
}
