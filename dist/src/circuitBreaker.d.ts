import { Options } from './options';
/**
 * Decorator
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