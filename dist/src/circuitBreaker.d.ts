import { Options } from './options';
/**
 * Decorator for property getters/setters and member functions.
 * If the circuit is broken, the function will either return
 * undefined or resolve to undefined (if it was a Promise).
 *
 * @param {Options} options Options
 * @return {MethodDecorator} Decorator for member functions
 */
export declare function CircuitBreaker(options?: Options): (target: any, propertyKey: PropertyKey, propertyDescriptor: TypedPropertyDescriptor<any>) => {
    enumerable?: boolean | undefined;
    configurable?: boolean | undefined;
    writable?: boolean | undefined;
    value?: any;
    get?: (() => any) | undefined;
    set?: ((value: any) => void) | undefined;
};
//# sourceMappingURL=circuitBreaker.d.ts.map