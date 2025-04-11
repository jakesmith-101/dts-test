import { body } from 'express-validator';

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: boolean;
    due: Date;
}

export const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is optional'),
    body('status').isBoolean().withMessage('Status must be a boolean'),
    body('due').isDate().withMessage('Due must be a date'),
];