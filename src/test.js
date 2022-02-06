const { CelikAPI } = require('./api');

const main = () => {
  const api = new CelikAPI();
  api.init();
  api.read();
  api.cleanup();
}

main();
