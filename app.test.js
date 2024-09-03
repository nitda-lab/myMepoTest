// 参考:
// jest
//    https://jestjs.io/ja/docs/getting-started
//    https://jestjs.io/ja/docs/testing-frameworks#expressjs
// supertest
//    https://github.com/ladjs/supertest#readme
// async, await
//    https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function
//    https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/await
//const request = require("supertest");
const { app, connectionPool } = require("./app");

// データベースのセットアップ
const { Client } = require('pg'); // PostgreSQL用のpgモジュールをインポート
const request = require('supertest');
//const app = require('../app'); // Expressアプリケーションをインポート
const { dbConfig } = require('./db/config'); // dbConfigをインポート

// `client` をスコープの外で宣言
let client;

// テスト前にデータベースに接続
beforeAll(async () => {
  client = new Client(dbConfig); // `client` を初期化
  await client.connect();
});


afterAll(async () => {
  await connectionPool.end()
  await client.end();
});

describe("ルートパス", () => {
  test("GET / で public/index.html の内容を表示すること", async () => {
    // GET / してレスポンスを得る.
    //  supertest.request() は実際のHTTPリクエストをせずに app レスポンスを得る.
    const response = await request(app).get("/");
    // ステータスコードが 200 であること.
    expect(response.statusCode).toBe(200);
    // レスポンスボディに titleタグとそのテキストが含まれること.
    expect(response.text).toMatch('<title>My First HTML</title>');
  });
});

describe("/hello", () => {
  test("GET /hello で こんにちは と表示すること", async () => {
    const response = await request(app).get("/hello");
    expect(response.statusCode).toBe(200);
    expect(response.text).toMatch('<h1>こんにちは！</h1>');
  });
});

describe('Welcome', () => {
  const userName = 'John';
  test("POST /welcome でユーザ名を受け取って表示すること", async () => {
    /* 以下を追記 */
    const response = await request(app)
      .post("/welcome")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({ userName }); 

    expect(response.statusCode).toBe(200);
    expect(response.text).toMatch(userName);
  });
});

// describe('Select', () => {
//   test("GET /select で趣味が表示されないこと", async () => {
//     const response = await request(app).get("/select")

//     expect(response.statusCode).toBe(200);
//   });
// });

describe('Select', () => {
  // 以下を追加
  const game = 'game';
  const drive = 'drive';
  const music ='music';
  const sports = 'sports';

  describe('チェックボックスで何も選択していない場合', () => {
    test("GET /select で趣味が表示されないこと", async () => {
      const response = await request(app).get("/select")

      expect(response.statusCode).toBe(200);
      // 以下を追加
      expect(response.text).not.toMatch(game);
      expect(response.text).not.toMatch(drive);
      expect(response.text).not.toMatch(music);
      expect(response.text).not.toMatch(sports);
    });
  });

  describe('チェックボックスで何か選択している場合', () => {
    test("GET /select で趣味が表示されること", async () => {
      const response = await request(app)
      .get("/select")
      .query({ hobby: [game, drive] }); // ここを追加

      expect(response.statusCode).toBe(200);
            // 以下を追加
            expect(response.text).toMatch(game);
            expect(response.text).toMatch(drive);
            expect(response.text).not.toMatch(music);
            expect(response.text).not.toMatch(sports);
    });
  });
});

describe("TODO", () => {
  test('GET /todo で TODO一覧が表示されること', async () => {
    const response = await request(app).get("/todo");
    expect(response.text).toMatch('<title>TODO</title>');
    expect(response.statusCode).toBe(200);
  });
});

// describe("MEPO", () => {
//   test('GET /mepo で 最新のメッセージが表示されること', async () => {
//     const response = await request(app).get("/mepo");

//     expect(response.statusCode).toBe(200);
//     const dammyMessage = 'dammyMessage';
//     await client.query('INSERT INTO mepo_message (message) VALUES ($1)', [dammyMessage]);
//     expect(response.text).toMatch('<p>最新のメッセージ: dammyMessage </p>');
//   });
// });

describe("MEPO", () => {
  test('GET /mepo/getLatestMessage で 最新3件のメッセージが表示されること', async () => {
    const dammyMessage = ['Dummy Message 1', 'Dummy Message 2', 'Dummy Message 3'];
    // ダミーデータを挿入
    await client.query('INSERT INTO mepo_message (message) VALUES ($1)', [dammyMessage]);
  

    // GETリクエストを実行
    const response = await request(app).get("/mepo/getLatestMessage");

    // ステータスコードが200であることを確認
    expect(response.statusCode).toBe(200);
    
    // 最新のメッセージが表示されることを確認
    expect(response.text).toContain('Dummy Message 1');
    expect(response.text).toContain('Dummy Message 2');
    expect(response.text).toContain('Dummy Message 3');

    // 挿入したダミーデータを削除してテスト後のクリーンアップを行う
    await client.query('DELETE FROM mepo_message WHERE message = $1', [dammyMessage]);
    
  });

});

describe("MEPO", () => {
  test('GET /mepo/chat-history で 過去の全てのメッセージが表示されること', async () => {
    await client.query('DELETE FROM mepo_message');
  
    const dammyMessage = ['Dummy Message 1', 'Dummy Message 2', 'Dummy Message 3'];
    // ダミーデータを挿入
    await client.query('INSERT INTO mepo_message (message) VALUES ($1)', [dammyMessage]);
  

    // GETリクエストを実行
    const response = await request(app).get("/mepo/chat-history");

    // ステータスコードが200であることを確認
    expect(response.statusCode).toBe(200);
    
    // 最新のメッセージが表示されることを確認
    expect(response.text).toContain('Dummy Message 1');
    expect(response.text).toContain('Dummy Message 2');
    expect(response.text).toContain('Dummy Message 3');

    // 挿入したダミーデータを削除してテスト後のクリーンアップを行う
    await client.query('DELETE FROM mepo_message WHERE message = $1', [dammyMessage]);
    
  });

});
