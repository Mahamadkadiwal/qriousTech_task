
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ciqfsculszifrupzxmsk.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpcWZzY3Vsc3ppZnJ1cHp4bXNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4Mzg3NTksImV4cCI6MjA3ODQxNDc1OX0.zIBrWscGjZ_tZij2pSBYTsGheb2S7H_Yj2hMgzm17S0"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;