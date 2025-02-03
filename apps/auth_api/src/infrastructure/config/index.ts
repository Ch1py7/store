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
		pubsubId: process.env.PUBSUB_PROJECT_ID!,
		key: process.env.PUBSUB_KEY!,
		email: process.env.PUBSUB_EMAIL!,
	},
}
