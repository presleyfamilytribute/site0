import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RefreshCw, UserX, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  email_confirmed_at: string | null;
  banned_until: string | null;
}

const AdminPanel = () => {
  const { user, isLoading } = useRequireAuth('/auth');
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [actionInProgress, setActionInProgress] = useState('');

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase.rpc('is_admin_user', { user_id: user.id });

        if (error) {
          console.error('Error checking admin status:', error);
          return;
        }

        setIsAdmin(!!data);

        if (data) {
          fetchUsers();
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    checkAdminStatus();
  }, [user]);

  const fetchUsers = async () => {
    if (!user) return;

    setLoadingUsers(true);
    try {
      const { data, error } = await supabase.functions.invoke<{ users: AdminUser[] }>('admin-get-users');

      if (error) {
        toast({
          title: 'Error fetching users',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      setUsers(data?.users || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch users',
        variant: 'destructive',
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleUserAction = async (userId: string, action: 'ban' | 'unban') => {
    setActionInProgress(userId);
    try {
      const { data, error } = await supabase.functions.invoke('admin-user-action', {
        body: { userId, action },
      });

      if (error) {
        toast({
          title: 'Action failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: `User ${action === 'ban' ? 'banned' : 'unbanned'} successfully`,
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || `Failed to ${action} user`,
        variant: 'destructive',
      });
    } finally {
      setActionInProgress('');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 text-elvis-gold animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You do not have permission to access this page.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <Card>
        <CardHeader>
          <CardTitle>Users Management</CardTitle>
          <CardDescription>Manage registered users for the Presley Family Tribute website.</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingUsers ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 text-elvis-gold animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Sign In</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {user.banned_until ? (
                        <Badge variant="destructive">Banned</Badge>
                      ) : (
                        <Badge variant="default">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell>{user.last_sign_in_at || 'Never'}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleUserAction(user.id, user.banned_until ? 'unban' : 'ban')}
                        disabled={actionInProgress === user.id}
                      >
                        {actionInProgress === user.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : user.banned_until ? (
                          <UserCheck className="h-4 w-4" />
                        ) : (
                          <UserX className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
