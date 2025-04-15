import { supabase } from '@/integrations/supabase/client';

export const getUsers = async () => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const createUser = async (user: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signUp(user);
  if (error) throw new Error(error.message);
  return data;
};