import Module from './_build/MaterialXLib.js';
import regeneratorRuntime from 'regenerator-runtime'; // This is required for the async/awaits

/**
 * Returns a promise that resolves the MaterialX namespace
 */
export function initMaterialX() {
    return new Promise(function (resolve) {
        // Note: Module is not a promise.
        // The then function is defined by emscripten.
        Module().then((module) => {
            resolve(module.getMaterialX());
        });
    });
}

/**
 * Helper function used to traverse a tree or a graph
 * @param {MaterialX.TreeIterator|MaterialX.GraphIterator} elements - iterator
 * @param {function} elemCb - callback called on each element. The element is passed to the callback. 
 */
export function traverse(elements, elemCb) {
    var elem = elements.next();
    while (elem) {
        elemCb && elemCb(elem);
        elem = elements.next();
    }
}
