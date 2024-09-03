// 参考:
// express
//    https://expressjs.com/ja/starter/hello-world.html
//    https://expressjs.com/ja/starter/static-files.html
// pg (node-postgres)
//    https://node-postgres.com/
// 分割代入
//    https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment


const http = require('http');
// expressアプリの準備.
const express = require('express');


const socketIo = require('socket.io');


const app = express();

const server = http.Server(app);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));  // ここを追加
//app.use(express.static('link'));

const io = socketIo(server);

//css適応のためのやつ
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// // PostgreSQL のクライアントを作成.
// const { Pool } = require('pg');
// const connectionPool = new Pool({
//   ...dbConfig,
//   max: 10,
// });

// public/ に配置した静的ファイルを返す.
app.use(express.static(path.join(__dirname, 'public')));  // 静的ファイルの提供


io.on('connection', (socket) => {
  console.log('connected');
});


// ルーティングサンプル1: /hello にアクセスすると "Hello World!" と返す.
// app.get('/hello', (req, res) => {
//   res.send('こんにちは！');
// });

// app.get('/hello', (req, res) => {
//   res.send(`
// <html><body>
//   <h1>こんにちは！</h1>
// </body></html>
// `);
// });

// // ルーティングサンプル2: /items にアクセスするとデータベースの favorite_fruit テーブルの内容を返す.
// app.get('/items', async (req, res) => {
//   const { rows } = await connectionPool.query('SELECT * FROM favorite_fruit');
//   res.json(rows);
// });

// // app.post('/welcome', (req, res) => {
// //   //var element = document.getElementById( "userName" ) ; // プロパティの取得
// //   //var returnValue = element.ValidityState ;	// ValidityState
// //   const { userName } = req.body;  // ここを追加
// //   if (userName.length >= 256) {
// //   res.status(400).send(`
// //   <html>
// // <head>
// // <title>Error</title>
// // </head>
// // <body>
// // <h1>エラー: 名前が長すぎます。
// // </h1>
// // <p>名前は255文字以内で入力してください。</p>
// // <br><br>
// // <a href="input.html">戻る</a>
// // </body>
// // </html>
// //     `);
// //   }else{
// //     res.send(`
// // <html>
// //   <head>
// //      <title>Welcome Servlet</title>
// //   </head>

// //   <body>
// //     <h1>こんにちは、${userName} さん！</h1>  <!-- ここを変更 -->
// //     <br><br>
// //     <a href="input.html">戻る</a>
// //   </body>
// // </html>
// // `);
// //     }
// // });

// app.post('/welcome', (req, res) => {
//   const { userName } = req.body;
//   res.send(`
// <html>
//   <head>
//     <title>Welcome Servlet</title>
//   </head>
//   <body>
//     <h1>こんにちは、${userName} さん！</h1>  <!-- ここを変更 -->
//     <br><br>
//     <a href="input.html">戻る</a>
//   </body>
// </html>
//   `);
// });

// app.get('/select', (req, res) => {
//   const { hobby } = req.query;
//   res.render('hobbyResultView', { hobbyItems: [hobby].flat().filter(v => v) });
// });

// module.exports = { app, connectionPool };

// // app.get('/todo', async (req, res) => {
// //   const rows = [];
// //   res.render('todoView', { todoList: rows });
// // });

// app.get('/todo', async (req, res) => {
//   const { rows } = await connectionPool.query('SELECT * FROM todo ORDER BY id');  // ここを変更する
//   // console.log(rows);
//   res.render('todoView', { todoList: rows });
// });

// //TODOリストをJson形式で返すエンドポイント
// app.get('/get-latest-todo', async (req, res) => {
//   try {
//     const { rows } = await connectionPool.query('SELECT * FROM todo ORDER BY id');
//     res.json(rows);  // クライアントにJSON形式でTODOリストを返す
//   } catch (error) {
//     console.error('Error fetching todo list:', error);
//     res.status(500).json({ error: 'Failed to fetch todo list' });
//   }
// });

// app.post('/todo',  async (req, res) => {
//   const { task } = req.body;
//   await connectionPool.query('INSERT INTO todo (title) VALUES ($1)', [task]);
//   //const { rows } = await connectionPool.query('SELECT * FROM todo');  // ここを変更する
//   /*res.send(`
//     <html>
//       <head>
//         <title>Welcome Servlet</title>
//       </head>
//       <body>
//         <h1>こんにちは、${task} さん！</h1>  <!-- ここを変更 -->
//         <br><br>
//         <a href="input.html">戻る</a>
//       </body>
//     </html>
//       `);*/
//   //res.render('todoView', { todoList: rows });
//   res.redirect('/todo'); // リダイレクトで再送信を防ぐ
// });

// app.post('/checkTask',  async (req, res) => {
//   // const checkedTask = req.body.completedTask;
//   const { completedTask, deletedTask} = req.body;
//   console.log("完了：" + completedTask);
//   console.log("削除：" + deletedTask);
//   // const checkedTask = document.getElementById("completedTask").value;
//   // console.log(checkedTask);
//   if(completedTask != undefined){
//     await connectionPool.query('UPDATE todo SET completed = true WHERE id=($1)', [completedTask]);
//   } 
  
//   if(deletedTask != undefined){
//     await connectionPool.query('DELETE FROM todo WHERE id=($1)', [deletedTask]);
//   }
     
//   res.redirect('/todo'); // リダイレクトで再送信を防ぐ
// });

app.get('/mepo', async (req, res) => {
  // const { rows } = await connectionPool.query('SELECT * FROM mepo_message WHERE id = (SELECT MAX(id) FROM mepo_message)');  // ここを変更する
  // console.log(rows);
  //res.render('todoView', { todoList: rows });

  // res.render('mepoView', { mepoList: rows });
  // res.json(rows);
  res.render('mepoView');
  
});

app.post('/mepo/post',  async (req, res) => {
  const { mepoTask } = req.body;
  console.log(mepoTask);
  // await connectionPool.query('INSERT INTO mepo_message (message) VALUES ($1)', [mepoTask]);
  //const { rows } = await connectionPool.query('SELECT * FROM todo');  // 
  //res.render('todoView', { todoList: rows });
  res.redirect('/mepo'); // リダイレクトで再送信を防ぐ
});

//TODOリストをJson形式で返すエンドポイント
// app.get('/mepo/getLatestMessage', async (req, res) => {
//   try {
//     // const { rows } = await connectionPool.query('SELECT * FROM mepo_message WHERE id = (SELECT MAX(id) FROM mepo_message)');
//      const { rows } = await connectionPool.query('SELECT * FROM mepo_message WHERE id >= (SELECT MAX(id) FROM mepo_message)-2');
//     console.log(rows);
//     res.json(rows);  // クライアントにJSON形式でTODOリストを返す
//   } catch (error) {
//     console.error('Error fetching todo list:', error);
//     res.status(500).json({ error: 'Failed to fetch todo list' });
//   }
// });

// app.get('/mepo/chat-history',async (req,res) => {
//   // const { rows } = await connectionPool.query('SELECT * FROM mepo_message ORDER BY id DESC');
  
//   const { rows } = await connectionPool.query('SELECT *FROM mepo_message WHERE DATE(time) = CURRENT_DATE ORDER BY id DESC');
//   res.render('mepoChatHistory',{messages: rows});
// }
// )
module.exports = { app,server };
