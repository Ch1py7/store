import type express from 'express'
import { body, type ValidationChain, validationResult } from 'express-validator'

const ProductsRules: ValidationChain[] = [
	body('products').isArray().withMessage('Products must be an array').bail(),
	body('products.*.id')
		.if(body('products').isArray({ min: 1 }))
		.trim()
		.notEmpty()
    .isUUID()
		.withMessage('products item ID must be a valid UUID')
		.bail(),
	body('products.*.quantity')
		.if(body('products').isArray({ min: 1 }))
		.isInt({ min: 1 })
		.withMessage('products item quantity must be an integer greater than 0')
		.bail(),
]

const validateRequest = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
): void => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		res
			.status(400)
			.json({ message: 'An error occurred while update the cart', errors: errors.array() })
		return
	}
	next()
}

export const validateProducts = [...ProductsRules, validateRequest]
