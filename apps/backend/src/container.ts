import { UserParser } from '@store/core'
import { InjectionMode, asClass, asValue, createContainer } from 'awilix'
import crypto from 'node:crypto'
import { GetCart } from './application/cart/get'
import { UpdateCart } from './application/cart/update'
import { CreateInventory } from './application/inventory/create'
import { CreateOrder } from './application/order/create'
import { GetOrder } from './application/order/get_order'
import { GetOrders } from './application/order/get_orders'
import { GetOrdersByUserId } from './application/order/get_orders_by_userid'
import { CreateProduct } from './application/product/create'
import { GetProduct } from './application/product/get_product'
import { GetProducts } from './application/product/get_products'
import { DeleteUser } from './application/user/delete'
import { GetUser } from './application/user/get_user'
import { GetUsers } from './application/user/get_users'
import { UpdateUser } from './application/user/update'
import { config } from './infrastructure/config'
import { PubSubClient } from './infrastructure/pubsub/pubsub-client'
import { PubSubListener } from './infrastructure/pubsub/pubsub-listener'
import { CartParser } from './infrastructure/repositories/cart/cart-parser'
import { CartRepository } from './infrastructure/repositories/cart/cart-repository'
import { InventoryParser } from './infrastructure/repositories/inventory/inventory-parser'
import { InventoryRepository } from './infrastructure/repositories/inventory/inventory-repository'
import { OrderParser } from './infrastructure/repositories/order/order-parser'
import { OrderRepository } from './infrastructure/repositories/order/order-repository'
import { ProductInventoryRepository } from './infrastructure/repositories/product/product-inventory-repository'
import { ProductParser } from './infrastructure/repositories/product/product-parser'
import { ProductRepository } from './infrastructure/repositories/product/product-repository'
import { UserRepository } from './infrastructure/repositories/user/user-repository'
import { supabaseClient } from './infrastructure/supabase/client'

export const container = createContainer<Dependencies>({
	injectionMode: InjectionMode.PROXY,
})

container.register({
	// user use cases
	updateUser: asClass(UpdateUser),
	deleteUser: asClass(DeleteUser),
	getUser: asClass(GetUser),
	getUsers: asClass(GetUsers),

	// product use cases
	createProduct: asClass(CreateProduct),
	getProduct: asClass(GetProduct),
	getProducts: asClass(GetProducts),

	// order use cases
	createOrder: asClass(CreateOrder),
	getOrder: asClass(GetOrder),
	getOrders: asClass(GetOrders),
	getOrdersByUserId: asClass(GetOrdersByUserId),

	// cart use cases
	getCart: asClass(GetCart),
	updateCart: asClass(UpdateCart),

	// inventory use cases
	createInventory: asClass(CreateInventory),

	// repositories
	userRepository: asClass(UserRepository),
	productRepository: asClass(ProductRepository),
	orderRepository: asClass(OrderRepository),
	cartRepository: asClass(CartRepository),
	inventoryRepository: asClass(InventoryRepository),
	productInventoryRepository: asClass(ProductInventoryRepository),

	// supabase client
	supabaseClient: asValue(supabaseClient),

	// parsers
	userParser: asClass(UserParser),
	productParser: asClass(ProductParser),
	orderParser: asClass(OrderParser),
	cartParser: asClass(CartParser),
	inventoryParser: asClass(InventoryParser),

	// PubSub
	pubSubClient: asClass(PubSubClient),
	pubSubListener: asClass(PubSubListener),

	// common
	crypto: asValue(crypto),
	config: asValue(config),
})
