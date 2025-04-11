import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Task, taskValidationRules } from '../models/task';

const router = Router();
let tasks: Task[] = [];

router.get('/', (req: Request, res: Response) => {
    // TODO: replace with DB fetch
    res.json(tasks);
});

router.get('/:id', (req: Request, res: Response) => {
    // TODO: replace with DB fetch
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    
    if (!task) res.status(404).send('Task not found');
    else res.json(task);
});

router.post('/', taskValidationRules, (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const task: Task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        status: false,
        due: req.body.due,
    };
    
    // replace with DB create
    tasks.push(task);
    res.status(201).json(task);
});

router.put('/:id', taskValidationRules, (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    
    // TODO: replace with DB fetch
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    
    if (!task) res.status(404).send('Task not found');
    else {
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.status = req.body.status || task.status;
        task.due = req.body.due || task.due;

        // TODO: replace with DB update
    
        res.json(task);
    }
});

router.delete('/:id', (req: Request, res: Response) => {
    // replace with DB delete/fetch
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  
    if (index === -1) {
        res.status(404).send('Task not found');
    } else {
        tasks.splice(index, 1);
        res.status(204).send();
    }
});

export default router;