import dotenv from 'dotenv'
dotenv.config()

export const config = {
	privateKey: process.env.PRIVATE_KEY ?? '',
	supabase: {
		key: process.env.SUPABASE_KEY!,
		url: process.env.SUPABASE_URL!,
	},
	server: {
		port: process.env.PORT ?? 3001,
		amqpUrl: process.env.AMQP_URL,
		cipherKey: process.env.CIPHER_KEY,
	},
}
