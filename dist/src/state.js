"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
const options_1 = require("./options");
/**
 * Circuit states.
 */
var Circuit;
(function (Circuit) {
    // Circuit is closed, and actual function will be executed.
    Circuit[Circuit["Closed"] = 0] = "Closed";
    // Circuit is open, and actual function will not be executed.
    Circuit[Circuit["Open"] = 1] = "Open";
    // Circuit is recovering.
    Circuit[Circuit["Half"] = 2] = "Half";
})(Circuit || (Circuit = {}));
/**
 *
 */
class State {
    /**
     * Constructor
     *
     * Initializes state for the circuit breaker.
     *
     * @param {Options} options State options.
     */
    constructor(options) {
        this.circuit = Circuit.Closed;
        this.failures = 0;
        this.options = options_1.buildOptions(options || {});
    }
    /**
     * Checks if the circuit is closed, and the wrapped
     * function can be executed.
     *
     * @return {boolean} true if circuit is open; false otherwise
     */
    canExecute() {
        if (this.circuit === Circuit.Closed) {
            return true;
        }
        else {
            const now = new Date();
            if (this.nextTry && this.nextTry <= now) {
                this.circuit = Circuit.Half;
                return true;
            }
            return false;
        }
    }
    /**
     * Success callback, executed if the wrapped function executed
     * successfully.
     */
    onSuccess() {
        this.circuit = Circuit.Closed;
        this.nextTry = undefined;
        this.failures = 0;
    }
    /**
     * Failure callback, executed if the wrapped function executed
     * unsuccessfully.
     */
    onFailure() {
        this.failures += 1;
        if (this.failures >= this.options.failureThreshold) {
            this.circuit = Circuit.Open;
            this.nextTry = new Date(Date.now() + this.options.cooldownPeriod);
        }
    }
}
exports.State = State;
//# sourceMappingURL=state.js.map