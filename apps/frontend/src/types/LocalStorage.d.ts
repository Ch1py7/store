interface ProductCart extends Product {
	quantity: number
  toCheckout: boolean
}

type Storages = 'cart' | 'favorites'
