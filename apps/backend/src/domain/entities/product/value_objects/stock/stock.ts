import { InvalidStockError } from './errors'

export class Stock {
	public readonly value: number

	constructor(value: number) {
		this._assertStock(value)
		this.value = value
	}

	public increase(quantity: number): Stock {
		this._assertPositiveQuantity(quantity);
		return new Stock(this.value + quantity);
	}

	public decrease(quantity: number): Stock {
		this._assertPositiveQuantity(quantity);
		const newValue = this.value - quantity;
		if (newValue < 0) {
			throw new InvalidStockError('The stock cannot be negative.');
		}
		return new Stock(newValue);
	}

	private _assertStock(value: number) {
		if (!Number.isInteger(value) || value < 0) {
			throw new InvalidStockError('The stock must be a non-negative integer.');
		}
	}

	private _assertPositiveQuantity(quantity: number) {
		if (!Number.isInteger(quantity) || quantity <= 0) {
			throw new InvalidStockError('The quantity must be a positive integer.');
		}
	}
}
