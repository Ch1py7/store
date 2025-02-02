import dotenv from 'dotenv'
dotenv.config()

export const config = {
	privateKey: process.env.PRIVATE_KEY ?? '',
	jwtSecret: process.env.JWT_SECRET ?? '',
	supabase: {
		key: process.env.SUPABASE_KEY!,
		url: process.env.SUPABASE_URL!,
	},
	server: {
		port: process.env.PORT ?? 7777,
		amqpUrl: process.env.AMQP_URL ?? '',
	},
}
