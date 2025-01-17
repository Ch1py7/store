interface ProductImageProps {
	source: string
	name: string
}

export const ProductImage: React.FC<ProductImageProps> = ({ source, name }): React.ReactNode => {
	return (
		<img
			src={source}
			alt={name}
			className='w-full rounded-lg object-cover object-center hover:opacity-75'
			style={{
				aspectRatio: 1 / 1,
			}}
		/>
	)
}
