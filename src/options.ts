/**
 * Options for Circuit Breaker.
 */
export interface Options {
  // Cooldown period before retrying.
  cooldownPeriod?: number;
  // Retry count.
  failureThreshold?: number;
  // Maximum cooldown period.
  maxCooldownPeriod?: number;
}

const defaultOptions: Required<Options> = {
  cooldownPeriod: 1000, // 1 seconds
  failureThreshold: 5,
  maxCooldownPeriod: 30 * 1000, // 30 seconds
};

/**
 * Creates an Options object with default values for missing parameters.
 *
 * @param {Options} options Optional option parameters
 * @return {Required<Option>} A valid {Option} object with all fields.
 */
export function buildOptions(options: Options): Required<Options> {
  return {
    ...defaultOptions,
    ...options,
  };
}
