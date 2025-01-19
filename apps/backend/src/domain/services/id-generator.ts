export class IdGenerator {
	private readonly _crypto: Dependencies['crypto']

	constructor({ crypto }: Pick<Dependencies, 'crypto'>) {
		this._crypto = crypto
	}

	public generate() {
		return this._crypto.webcrypto.randomUUID()
	}
}
