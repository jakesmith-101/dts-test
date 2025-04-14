import pool from "../db";

export function CreateTaskTable() {
    pool.query("CREATE TABLE IF NOT EXISTS `tasks` (`id` int(11) NOT NULL auto_increment, `title` varchar(250) NOT NULL default '', `description` varchar(250), `status` boolean NOT NULL default false , `due` timestamp NOT NULL default now(), PRIMARY KEY (`id`);");
}