interface HeartProps {
	like: boolean
}

export const Heart: React.FC<HeartProps> = ({ like }): React.ReactNode => {
	return (
		<>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill={`${like ? '#f00' : 'none'}`}
				stroke={`${like ? '#f00' : 'currentColor'}`}
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='lucide lucide-heart'
			>
				<title>Fav</title>
				<path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
			</svg>
		</>
	)
}
