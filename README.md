# node-celik-api

NodeJS Wrapper for Čelik API (Serbian ID Card Reader)

## Requirements

- Windows OS
- NodeJS

## Dependencies

- ffi-napi
- ref-array-di
- ref-napi
- ref-struct-di
- upath

## Instalation

`npm install node-celik-api`

## Ussage

```
const fs = require('fs');

const { CelikAPI } = require('./api');

const main = () => {
  const api = new CelikAPI();
  api.init();                   // Call Only Once

  const data = api.read();      // Read Data From Id Card
  console.log(data);

  fs.writeFileSync('./test.bmp', data.portrait);

  api.cleanup();                // Call Only Once
}

main();
```
