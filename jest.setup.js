const { spawnSync } = require('node:child_process');
const { Client } = require('pg');
const { dbConfig } = require('./db/config');

// テーブル一覧を取得・削除
async function dropTables() {
  const client = new Client(dbConfig)
  await client.connect();

  const { rows } = await client.query(`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`);

  await Promise.all(rows.map((table) => {
    return client.query(`DROP TABLE ${table.tablename}`);
  }));

  client.end();
}

// テーブル作成・初期データ挿入
async function initTables() {
  spawnSync('npm', ['run', 'db:init'], { env: process.env });
}

beforeAll(async () => {
  await dropTables();
  await initTables();
});
