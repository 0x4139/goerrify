## goerrify ![NPM Version](https://img.shields.io/npm/v/goerrify) - Bringing Go-style Error Handling to JavaScript

The `goerrify` package provides utilities to simplify error handling in JavaScript, inspired by Go's approach. It offers two functions:

- `errify`: Asynchronously wraps a promise and returns an array containing the resolved value (if successful) or `null` and the caught error (if rejected).
- `errifyAll`: Asynchronously handles a collection of promises using `Promise.allSettled`, returning an array of arrays where each inner array contains the resolved value or `null` and the corresponding error (if any).

**Installation**

```bash
npm install goerrify
```

**Usage**

**CommonJS**

```javascript
const { errify, errifyAll } = require('goerrify');

async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    return await response.json();
  } catch (err) {
    return null;
  }
}

async function main() {
  const [data, err] = await errify(fetchData());
  if (err) {
    console.error('Error fetching data:', err);
    return;
  }

  console.log('Fetched data:', data);

  // Using errifyAll for multiple promises
  const promises = [fetchData(), anotherPromise(), ...];
  const results = await errifyAll(promises);

  results.forEach(([result, error]) => {
    if (error) {
      console.error('Error in promise:', error);
    } else {
      console.log('Result:', result);
    }
  });
}

main();
```

**Modules (ES6+)**

```javascript
import { errify, errifyAll } from 'goerrify';

async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    return await response.json();
  } catch (err) {
    return null;
  }
}

async function main() {
  const [data, err] = await errify(fetchData());
  if (err) {
    console.error('Error fetching data:', err);
    return;
  }

  console.log('Fetched data:', data);

  // Using errifyAll for multiple promises
  const promises = [fetchData(), anotherPromise(), ...];
  const results = await errifyAll(promises);

  results.forEach(([result, error]) => {
    if (error) {
      console.error('Error in promise:', error);
    } else {
      console.log('Result:', result);
    }
  });
}

main();
```

**Key Points**

- `errify` provides a concise way to handle individual promises, returning both the result and any encountered error in a single array.
- `errifyAll` is useful for managing collections of promises, allowing you to efficiently process their outputs and errors in a single loop.

**Benefits of goerrify**

- Improves code readability and maintainability by promoting a consistent error handling pattern.
- Simplifies promise handling by avoiding nested `try...catch` blocks.
- Provides a familiar approach for developers coming from Go or similar languages.

**Additional Considerations**

- While `goerrify` simplifies common error handling patterns, complex scenarios might still require more elaborate error management strategies.
- Consider using a library like `bluebird` for advanced promise handling features.

License MIT ![GitHub License](https://img.shields.io/github/license/0x4139/goerrify)