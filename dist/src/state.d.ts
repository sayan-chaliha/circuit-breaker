import { Options } from './options';
/**
 *
 */
export declare class State {
    private circuit;
    private nextTry?;
    private failures;
    private options;
    /**
     * Constructor
     *
     * Initializes state for the circuit breaker.
     *
     * @param {Options} options State options.
     */
    constructor(options?: Options);
    /**
     * Checks if the circuit is closed, and the wrapped
     * function can be executed.
     *
     * @return {boolean} true if circuit is open; false otherwise
     */
    canExecute(): boolean;
    /**
     * Success callback, executed if the wrapped function executed
     * successfully.
     */
    onSuccess(): void;
    /**
     * Failure callback, executed if the wrapped function executed
     * unsuccessfully.
     */
    onFailure(): void;
}
//# sourceMappingURL=state.d.ts.map