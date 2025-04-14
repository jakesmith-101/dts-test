import express, { Request, Response, NextFunction } from 'express';
import taskRoutes from './routes/task';
import { CreateTaskTable } from './mocking/task';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/tasks', taskRoutes);
CreateTaskTable();

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});