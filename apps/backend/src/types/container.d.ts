import type { GetCart } from '@/application/cart/get'
import type { UpdateCart } from '@/application/cart/update'
import type { CreateInventory } from '@/application/inventory/create'
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
import type { PubSubClient } from '@/infrastructure/pubsub/pubsub-client'
import type { PubSubListener } from '@/infrastructure/pubsub/pubsub-listener'
import type { AttributeParser } from '@/infrastructure/repositories/attributes/attributes-parser'
import type { AttributeRepository } from '@/infrastructure/repositories/attributes/attributes-repository'
import type { CartParser } from '@/infrastructure/repositories/cart/cart-parser'
import type { CartRepository } from '@/infrastructure/repositories/cart/cart-repository'
import type { InventoryParser } from '@/infrastructure/repositories/inventory/inventory-parser'
import type { InventoryRepository } from '@/infrastructure/repositories/inventory/inventory-repository'
import type { OrderParser } from '@/infrastructure/repositories/order/order-parser'
import type { OrderRepository } from '@/infrastructure/repositories/order/order-repository'
import type { ProductInventoryRepository } from '@/infrastructure/repositories/product/product-inventory-repository'
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

		// cart use cases
		getCart: GetCart
		updateCart: UpdateCart

		// inventory use cases
		createInventory: CreateInventory

		// repositories
		userRepository: UserRepository
		productRepository: ProductRepository
		orderRepository: OrderRepository
		cartRepository: CartRepository
		inventoryRepository: InventoryRepository
		productInventoryRepository: ProductInventoryRepository
		attributeRepository: AttributeRepository

		// supabase client
		supabaseClient: typeof supabaseClient

		// parsers
		userParser: UserParser
		productParser: ProductParser
		orderParser: OrderParser
		cartParser: CartParser
		inventoryParser: InventoryParser
		attributeParser: AttributeParser

		// PubSub
		pubSubClient: PubSubClient
		pubSubListener: PubSubListener

		// common
		crypto: typeof crypto
		config: typeof config
	}
}
