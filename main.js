const { app, server } = require('./app'); //appとserverのインポートへ変更
const { APP_PORT } = process.env;
const port = parseInt(APP_PORT || '3000');

server.listen(port, () => { //app.listenからserver.listenへ変更
  console.log(`Example app listening on port ${port}`);
});
