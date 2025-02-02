import type { CreateOrder } from '@/application/order/create'
import type { GetOrder } from '@/application/order/get_order'
import type { GetOrders } from '@/application/order/get_orders'
import type { GetOrdersByUserId } from '@/application/order/get_orders_by_userid'
import type { CreateProduct } from '@/application/product/create'
import type { GetProduct } from '@/application/product/get_product'
import type { GetProducts } from '@/application/product/get_products'
import type { DeleteUser } from '@/application/user/delete'
import type { GetUser } from '@/application/user/get_user'
import type { GetUsers } from '@/application/user/get_users'
import type { UpdateUser } from '@/application/user/update'
import type { AMQPClient } from '@/infrastructure/amqp/amqp-client'
import type { CartParser } from '@/infrastructure/repositories/cart/cart-parser'
import type { CartRepository } from '@/infrastructure/repositories/cart/cart-repository'
import type { OrderParser } from '@/infrastructure/repositories/order/order-parser'
import type { OrderRepository } from '@/infrastructure/repositories/order/order-repository'
import type { ProductParser } from '@/infrastructure/repositories/product/product-parser'
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
		getOrder: GetOrder
		getOrders: GetOrders
		getOrdersByUserId: GetOrdersByUserId

		// repositories
		userRepository: UserRepository
		productRepository: ProductRepository
		orderRepository: OrderRepository
		cartRepository: CartRepository

		// supabase client
		supabaseClient: typeof supabaseClient

		// parsers
		userParser: UserParser
		productParser: ProductParser
		orderParser: OrderParser
		cartParser: CartParser

		// Amqp client
		amqpClient: AMQPClient

		// common
		crypto: typeof crypto
		config: typeof config
	}
}
