import express, { Request, Response, NextFunction } from 'express';
import { CreateTaskTable } from './mocking/task';
import router from './routes';

const app = express();
const port = 8080;

app.use(express.json());
app.use('/api', router);
CreateTaskTable();

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});