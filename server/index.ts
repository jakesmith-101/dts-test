import express, { Request, Response } from 'express';
import taskRoutes from './task';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/tasks', taskRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});