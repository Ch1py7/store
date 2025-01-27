import dotenv from 'dotenv'
dotenv.config()

export const config = {
	privateKey: process.env.PRIVATE_KEY ?? '',
	supabase: {
		key: process.env.SUPABASE_KEY!,
		url: process.env.SUPABASE_URL!,
	},
}
