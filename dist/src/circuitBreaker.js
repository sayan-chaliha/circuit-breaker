"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBreaker = void 0;
const state_1 = require("./state");
/**
 * Wraps a promise.
 *
 * @param {Promise} promise Promise to wrap.
 * @param {State} state State to update on success/error.
 * @return {Promise} Returns a new Promise.
 */
function wrapPromise(promise, state) {
    return new Promise(async (resolve) => {
        try {
            const value = await promise;
            state.onSuccess();
            resolve(value);
        }
        catch (err) {
            state.onFailure();
            resolve(undefined);
        }
    });
}
/**
 * Decorator for property getters/setters and member functions.
 * If the circuit is broken, the function will either return
 * undefined or resolve to undefined (if it was a Promise).
 *
 * @param {Options} options Options
 * @return {MethodDecorator} Decorator for member functions
 */
function CircuitBreaker(options) {
    return (target, propertyKey, propertyDescriptor) => {
        const stateKey = `___circuitbreaker_${target.constructor.name}::${String(propertyKey)}`;
        let descriptorKey = 'value';
        let orignalFunction;
        if (typeof propertyDescriptor.value === 'function') {
            descriptorKey = 'value';
            orignalFunction = propertyDescriptor.value;
        }
        else if (typeof propertyDescriptor.get === 'function') {
            descriptorKey = 'get';
            orignalFunction = propertyDescriptor.get;
        }
        else if (typeof propertyDescriptor.set === 'function') {
            descriptorKey = 'set';
            orignalFunction = propertyDescriptor.set;
        }
        else {
            throw new Error(`CircuitBreaker: Can only be applied to member functions.`);
        }
        if (!target[stateKey]) {
            target[stateKey] = new state_1.State(options);
        }
        return {
            ...propertyDescriptor,
            [descriptorKey]: (...args) => {
                const state = target[stateKey];
                try {
                    if (!state.canExecute())
                        return undefined;
                    const value = orignalFunction.apply(target, ...args);
                    if (value instanceof Promise) {
                        return wrapPromise(value, state);
                    }
                    else {
                        state.onSuccess();
                        return value;
                    }
                }
                catch (err) {
                    state.onFailure();
                    return undefined;
                }
            },
        };
    };
}
exports.CircuitBreaker = CircuitBreaker;
//# sourceMappingURL=circuitBreaker.js.map