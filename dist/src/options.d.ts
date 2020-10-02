export interface Options {
    cooldownPeriod?: number;
    failureThreshold?: number;
    maxCooldownPeriod?: number;
}
/**
 * Creates an Options object with default values for missing parameters.
 *
 * @param {Options} options Optional option parameters
 * @return {Required<Option>} A valid {Option} object with all fields.
 */
export declare function buildOptions(options: Options): Required<Options>;
//# sourceMappingURL=options.d.ts.map