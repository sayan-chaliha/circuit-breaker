# @scintillate/circuit-breaker
A simple circuit breaker for TypeScript.

## Installation
```
npm install --save @scintillate/circuit-breaker
```

## Usage
### Basic Usage
```typescript
import { CircuitBreaker } from '@scintillate/circuit-breaker';

class Test {
  @CircuitBreaker()
  async callService(): Promise<any> {
    // ...
  }
};
```

### Options
```typescript
export interface Options {
  // Cooldown period before retrying in milliseconds.
  cooldownPeriod?: number;
  // Retry count, before giving up.
  failureThreshold?: number;
  // Maximum cooldown period in milliseconds.
  maxCooldownPeriod?: number;
}

...
@CircuitBreaker({
  cooldownPeriod: 1000, // 1 second
  failureThreshold: 5,
  maxCooldownPeriod: 30 * 1000 // 30 seconds
})
...
```

The library does not automatically retry function execution. It depends on your application calling
the function. If the function throws an exception `failureThreshold` times consecutively, the circuit goes into
an `open` state. Consequent calls to the function will return `undefined` (or `Promise`s will resolve to `undefined`)
until `cooldownPeriod` has elapsed. `cooldownPeriod` increases exponentially with each subsequent failure to a
maximum of `maxCooldownPeriod`.

Note that exceptions are not propagated.