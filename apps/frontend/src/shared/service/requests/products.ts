export namespace ProductsService {
	export const get = (id = '', search = '') => `http://localhost:8888/api/v1/products${id}${search ? `?search=${search}` : ''}`
	export const create = 'http://localhost:8888/api/v1/products'
	export const update = (id: string) => `http://localhost:8888/api/v1/products/${id}`
}
