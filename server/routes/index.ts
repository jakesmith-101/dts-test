import { Router } from "express";
import taskRoutes from './task';

const router = Router();
router.use('/tasks', taskRoutes);
export default router;