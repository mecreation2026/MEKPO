import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const isSupabaseConfigured = () => {
  const url = (import.meta as any).env?.VITE_SUPABASE_URL;
  const key = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
    url !== 'https://your-project.supabase.co' &&
    key &&
    key !== 'your-anon-key-here'
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface HireSubmissionData {
  name: string;
  mobile: string;
  email: string;
  address?: string;
  why_hire: string;
}

export async function submitHireRequest(data: HireSubmissionData) {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase
        .from('hire_requests')
        .insert([
          {
            name: data.name,
            mobile: data.mobile,
            email: data.email,
            address: data.address || '',
            why_hire: data.why_hire,
          }
        ]);
      if (error) {
        console.warn('Supabase insertion error:', error.message);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      console.warn('Supabase request failed:', err);
      return { success: false, error: err?.message || 'Database error' };
    }
  } else {
    // Graceful fallback for local development / testing without live Supabase credentials
    console.info('Supabase not configured with live credentials. Stored locally in demo mode.', data);
    const existing = JSON.parse(localStorage.getItem('mekpo_hire_submissions') || '[]');
    existing.push({ ...data, created_at: new Date().toISOString() });
    localStorage.setItem('mekpo_hire_submissions', JSON.stringify(existing));
    return { success: true, demo: true };
  }
}