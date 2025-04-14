import { body, type ValidationChain } from 'express-validator';

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: boolean;
    due: Date;
}

export const taskValidationRules = (options?: {
    additionalRules?: ValidationChain[];
    prefix?: string;
    suffix?: string;
}) => {
    const prefix = options?.prefix ?? "";
    const suffix = options?.suffix ?? "";
    return [
        ...options?.additionalRules ?? [],
        body(prefix + 'title' + suffix).isString().notEmpty().withMessage('Title is required'),
        body(prefix + 'description' + suffix).isString().optional().withMessage('Description is optional'),
        body(prefix + 'status' + suffix).isBoolean().withMessage('Status must be a boolean'),
        body(prefix + 'due' + suffix).isDate().withMessage('Due must be a date'),
    ];
}