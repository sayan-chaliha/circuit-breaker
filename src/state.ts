import {Options, buildOptions} from './options';

/**
 * Circuit states.
 */
enum Circuit {
  // Circuit is closed, and actual function will be executed.
  Closed,
  // Circuit is open, and actual function will not be executed.
  Open,
  // Circuit is recovering.
  Half,
}

/**
 *
 */
export class State {
  private circuit: Circuit = Circuit.Closed;
  private nextTry?: Date;
  private failures: number = 0;
  private options: Required<Options>;

  /**
   * Constructor
   *
   * Initializes state for the circuit breaker.
   *
   * @param {Options} options State options.
   */
  constructor(options?: Options) {
    this.options = buildOptions(options || {});
  }

  /**
   * Checks if the circuit is closed, and the wrapped
   * function can be executed.
   *
   * @return {boolean} true if circuit is open; false otherwise
   */
  canExecute(): boolean {
    if (this.circuit === Circuit.Closed) {
      return true;
    } else {
      const now: Date = new Date();
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
  onSuccess(): void {
    this.circuit = Circuit.Closed;
    this.nextTry = undefined;
    this.failures = 0;
  }

  /**
   * Failure callback, executed if the wrapped function executed
   * unsuccessfully.
   */
  onFailure(): void {
    this.failures += 1;
    if (this.failures >= this.options.failureThreshold) {
      this.circuit = Circuit.Open;
      const cooldownFactor = this.failures - this.options.failureThreshold + 1;
      const cooldownPeriod: number = Math.min(this.options.maxCooldownPeriod,
          cooldownFactor * this.options.cooldownPeriod);
      this.nextTry = new Date(Date.now() + cooldownPeriod);
    }
  }
}
