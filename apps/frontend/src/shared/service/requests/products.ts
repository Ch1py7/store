export namespace ProductsService {
	export const get = (id = '') => `http://localhost:8888/api/v1/products/${id}`
}
