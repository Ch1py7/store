import type { Database } from './supabase.types'
import { createClient } from '@supabase/supabase-js'
import { config } from '../config'

export const supabaseClient = createClient<Database>(config.supabase.url, config.supabase.key)
