import { body } from 'express-validator';

// ------- validation rules for product -------
export const productValidationRules = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a number greater than 0'),
    body('description').isLength({ max: 200 }).withMessage('Description should not exceed 200 characters'),
    body('stockQuantity').isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer')
];
