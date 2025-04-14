import pool from "../db";

export function CreateTaskTable() {
    pool.query("CREATE TABLE IF NOT EXISTS tasks (id integer primary key generated always as identity, title varchar(100) NOT NULL default '', description varchar(250), status boolean NOT NULL default false , due timestamp NOT NULL default now());");
}