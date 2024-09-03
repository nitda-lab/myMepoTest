const { app, server } = require('./app');
const { APP_PORT } = process.env;
const port = parseInt(APP_PORT || '3000');

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
