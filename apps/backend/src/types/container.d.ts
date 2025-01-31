import type { CreateOrder } from '@/application/order/create'
import type { CreateProduct } from '@/application/product/create'
import type { GetProduct } from '@/application/product/get_product'
import type { GetProducts } from '@/application/product/get_products'
import type { DeleteUser } from '@/application/user/delete'
import type { GetUser } from '@/application/user/get_user'
import type { GetUsers } from '@/application/user/get_users'
import type { UpdateUser } from '@/application/user/update'
import type { OrderParser } from '@/infrastructure/repositories/order/order-parser'
import type { OrderRepository } from '@/infrastructure/repositories/order/order-repository'
import type { ProductParser } from '@/infrastructure/repositories/product/parser/product-parser'
import type { ProductRepository } from '@/infrastructure/repositories/product/product-repository'
import type { UserRepository } from '@/infrastructure/repositories/user/user-repository'
import type { supabaseClient } from '@/infrastructure/supabase/client'
import type { UserParser } from '@store/core'
import type crypto from 'node:crypto'
import type { config } from '../infrastructure/config/index'

declare global {
	interface Dependencies {
		// user use cases
		updateUser: UpdateUser
		deleteUser: DeleteUser
		getUser: GetUser
		getUsers: GetUsers

		// product use cases
		createProduct: CreateProduct
		getProduct: GetProduct
		getProducts: GetProducts

		// order use cases
		createOrder: CreateOrder

		// repositories
		userRepository: UserRepository
		productRepository: ProductRepository
		orderRepository: OrderRepository

		// supabase client
		supabaseClient: typeof supabaseClient

		// parsers
		userParser: UserParser
		productParser: ProductParser
		orderParser: OrderParser

		// common
		crypto: typeof crypto
		config: typeof config
	}
}
