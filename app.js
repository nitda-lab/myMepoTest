

const http = require('http');
// expressアプリの準備.
const express = require('express');


const socketIo = require('socket.io'); //socket.ioのインポート


const app = express();

const server = http.Server(app);//serverの宣言

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const io = socketIo(server); //ioの宣言

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));  // 静的ファイルの提供

//ioの接続の設定
io.on('connection', (socket) => {
  console.log('connected');
});

io.on('connection', (socket) => {
  console.log('user connected');

  // 'sendMessage' というイベント名で受信できる
  // 第一引数には受信したメッセージが入り、ログに出力する
  socket.on('sendMessage', (message) => {
    console.log('Message has been sent: ', message);
    //------------------
    //<<受信したメッセージをデータベースに登録する処理を書く>>
    //----------------

    //データベースから最新のメッセージのrowsを取得
    //try {
      //     // const { rows } = await connectionPool.query('SELECT * FROM mepo_message WHERE id = (SELECT MAX(id) FROM mepo_message)');
      //      const { rows } = await connectionPool.query('SELECT * FROM mepo_message WHERE id >= (SELECT MAX(id) FROM mepo_message)-2');
      //     console.log(rows);
      //     res.json(rows);  // クライアントにJSON形式でTODOリストを返す
      //   } catch (error) {
      //     console.error('Error fetching todo list:', error);
      //     res.status(500).json({ error: 'Failed to fetch todo list' });
      //   }


      //これはデータベースなしでrowを偽造するための疑似データです
      const rows = [
        {
          id: 101,
          message: 'System maintenance will occur at midnight.',
          date: '2024-09-01 23:59:59',
        },
        {
          id: 102,
          message: 'New user registration has been temporarily disabled.',
          date: '2024-09-02 12:34:56',
        },
        {
          id: 103,
          message: 'The issue with payment processing has been resolved.',
          date: '2024-09-03 08:15:30',
        },
      ];
      
      const jsonRows = JSON.stringify(rows);
      console.log(jsonRows);
      

      
      
    // 'receiveMessage' というイベントを発火、最新のテーブル情報を全てのクライアントに対して送信する
    io.emit('receiveMessage', jsonRows);
    console.log("send message  " + jsonRows);

    
    
  });
});


//--以下変更なし。最下部のexport設定は大事

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
module.exports = { app,server }; //appとserverをエクスポート。main.jsへ
