interface ProductImageProps {
	source: string
	name: string
	height: string
}

export const ProductImage: React.FC<ProductImageProps> = ({
	source,
	height,
	name,
}): React.ReactNode => {
	return (
		<img
			src={source}
			alt={name}
			className={`h-[${height}] w-full rounded-lg object-cover object-center hover:opacity-75 aspect-w-4 aspect-h-4`}
		/>
	)
}
