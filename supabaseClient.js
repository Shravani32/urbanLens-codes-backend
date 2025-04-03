import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Initialize Supabase Client
const supabase = createClient(supabaseUrl, supabaseKey);
console.log(`Supabase Client initialized with URL: ${supabaseUrl}`);

export default supabase;
