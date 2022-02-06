const { CelikAPI } = require('./api');

const main = () => {
  const api = new CelikAPI();
  api.init();
  const data = api.read();
  console.log(data);
  api.cleanup();
}

main();
