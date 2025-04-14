import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Task, taskValidationRules } from '../models/task';
import pool from '../db';
import { QueryResult } from 'pg';

const router = Router();
let tasks: Task[] = [];

router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM tasks");
  
        console.log({ result: JSON.stringify(result) });
  
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM tasks where id=$1", [parseInt(req.params.id)]);
        console.log("Fetch task: ", req.params.id);

        if (result.rowCount && result.rowCount > 0) res.status(200).json(result.rows);
        else res.status(404).send('Task not found');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
    }
});

router.post(
    '/',
    taskValidationRules({additionalRules: [body('tasks').isArray()], prefix: "tasks.*."}),
    async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        const tasks = req.body.tasks;
        const promises: Promise<QueryResult<any>>[] = [];
        for (const task of tasks) {
            const { title, description, status, due } = task;
            promises.push(
                client.query("INSERT INTO tasks (title, description, status, due) VALUES ($1, $2, $3, $4)", [
                    title,
                    description,
                    status,
                    due,
                ])
            );
        }

        await Promise.all(promises);

        await client.query("COMMIT");
        res.status(200).json({ message: "Tasks added successfully" });
    } catch (error) {
        console.error(error);
        await client.query("ROLLBACK");
        res.status(500).json({ error: (error as Error).message });
    }
});

router.put('/:id', taskValidationRules(), async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const task = req.body as Omit<Task, "id">

    try {
        const result = await pool.query("UPDATE tasks SET title=$2, description=$3, status=$4, due=$5 WHERE id=$1", [parseInt(req.params.id), task.title, task.description, task.status, task.due]);
        console.log("Update task: ", req.params.id);
        
        if (result.rowCount && result.rowCount > 0) res.status(200).json({ message: "Task updated successfully" });
        else res.status(404).send('No task updated');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
        res.status(200).json({ message: "Task deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
      }
});

export default router;