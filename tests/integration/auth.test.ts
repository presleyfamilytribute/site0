import { supabase } from '@/integrations/supabase/client';

describe('Authentication', () => {
  it('should sign up a new user', async () => {
    const { user, error } = await supabase.auth.signUp({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(error).toBeNull();
    expect(user).not.toBeNull();
  });
});