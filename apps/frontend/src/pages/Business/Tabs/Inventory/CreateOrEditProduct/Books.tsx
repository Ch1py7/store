import type { FieldErrors, UseFormRegister } from 'react-hook-form'

interface BooksProps {
	register: UseFormRegister<GeneralInputs<'BOOKS'>>
	errors: FieldErrors<GeneralInputs<'BOOKS'>>
}

export const Books: React.FC<BooksProps> = ({ register, errors }): React.ReactNode => {
	const booksErrors = errors.attributes as FieldErrors<BooksInputs> | undefined

	return (
		<div className='space-y-4'>
			<div className='grid grid-cols-4 gap-4'>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Publisher
						<input
							placeholder='J.K. Rowling'
							{...register('attributes.publisher', {
								required: {
									message: 'A publisher is required',
									value: true,
								},
							})}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${booksErrors?.publisher ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{booksErrors?.publisher && (
						<p className='text-red-500 text-sm'>{booksErrors?.publisher.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Language
						<input
							placeholder='English'
							{...register('attributes.language', {
								required: {
									message: 'A language is required',
									value: true,
								},
							})}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${booksErrors?.language ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{booksErrors?.language && (
						<p className='text-red-500 text-sm'>{booksErrors?.language.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Cover
						<input
							placeholder='Hardcover'
							{...register('attributes.cover', {
								required: {
									value: true,
									message: 'A cover is required',
								},
							})}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${booksErrors?.cover ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{booksErrors?.cover && (
						<p className='text-red-500 text-sm'>{booksErrors?.cover.message}</p>
					)}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-1'>
						Pages
						<input
							placeholder='323'
							{...register('attributes.pages', {
								required: {
									value: true,
									message: 'Number of pages is required',
								},
							})}
							className={`mt-1 block w-full px-3 py-2 shadow-sm border ${booksErrors?.pages ? 'border-red-500' : 'border-gray-300'} rounded-md`}
						/>
					</label>
					{booksErrors?.pages && (
						<p className='text-red-500 text-sm'>{booksErrors?.pages.message}</p>
					)}
				</div>
			</div>
		</div>
	)
}
