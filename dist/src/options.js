"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOptions = void 0;
const defaultOptions = {
    cooldownPeriod: 1000,
    failureThreshold: 5,
    maxCooldownPeriod: 30 * 1000,
};
/**
 * Creates an Options object with default values for missing parameters.
 *
 * @param {Options} options Optional option parameters
 * @return {Required<Option>} A valid {Option} object with all fields.
 */
function buildOptions(options) {
    return {
        ...defaultOptions,
        ...options,
    };
}
exports.buildOptions = buildOptions;
//# sourceMappingURL=options.js.map