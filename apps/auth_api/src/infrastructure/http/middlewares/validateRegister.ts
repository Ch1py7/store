import type express from 'express'
import { body, type ValidationChain, validationResult } from 'express-validator'

const RegisterRules: ValidationChain[] = [
	body('firstName').trim().notEmpty().withMessage('First name is required').bail(),
	body('lastName').trim().notEmpty().withMessage('Last name is required').bail(),
	body('email').isEmail().withMessage('Invalid email address').bail(),
	body('password')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters long')
		.bail(),
	body('role').isInt({ min: 1, max: 2}).withMessage('Role must be 1 or 2').bail(),

	body('cart').optional().isArray().withMessage('Cart must be an array').bail(),
	body('cart.*.id')
		.if(body('cart').isArray({ min: 1 }))
		.trim()
		.notEmpty()
    .isUUID()
		.withMessage('Cart item ID must be a valid UUID')
		.bail(),
	body('cart.*.quantity')
		.if(body('cart').isArray({ min: 1 }))
		.isInt({ min: 1 })
		.withMessage('Cart item quantity must be an integer greater than 0')
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
			.json({ message: 'An error occurred while register the user', errors: errors.array() })
		return
	}
	next()
}

export const validateRegister = [...RegisterRules, validateRequest]
