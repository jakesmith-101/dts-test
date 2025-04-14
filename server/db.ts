import { Pool, type PoolConfig } from "pg";

const postgresInfo: PoolConfig = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
}

if (postgresInfo.user === undefined) throw new Error('Postgres User is undefined.');
if (postgresInfo.host === undefined) throw new Error('Postgres Host is undefined.');
if (postgresInfo.database === undefined) throw new Error('Postgres DB is undefined.');
if (postgresInfo.password === undefined) throw new Error('Postgres Password is undefined.');
if (postgresInfo.port === undefined) throw new Error('Postgres Port is undefined.');
const pool = new Pool(postgresInfo);

export default pool;