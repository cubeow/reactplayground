import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jvhdewcmouobeebohcyz.supabase.co';
const supabaseKey = 'sb_publishable_xJYs-Vyp0RHNQPKCNBOiqA_IFuXkkaN';

const supabase = createClient(supabaseUrl, supabaseKey);

async function addRankColumn() {
  const { data, error } = await supabase.rpc('exec_sql', { 
    sql: 'ALTER TABLE tasks ADD COLUMN IF NOT EXISTS rank integer;' 
  });
  
  if (error) {
    console.log('Error:', error.message);
    // Try alternative approach
    const { error: altError } = await supabase.from('tasks').select('rank').limit(1);
    if (altError && altError.message.includes('does not exist')) {
      console.log('Rank column does not exist. Please add it manually via Supabase dashboard.');
    } else {
      console.log('Rank column may already exist or table is accessible');
    }
  } else {
    console.log('Success:', data);
  }
}

addRankColumn();
