import { Link } from 'react-router-dom';
import { Icon } from '@/components/ui/Icon';
import { useAuth } from '@/hooks/useAuth';
import { getDashboardPath } from '@/lib/navigation/roleNavigation';
import { cn } from '@/lib/utils';

export function LoginButton() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (user?.role) {
    return (
      <Link
        to={getDashboardPath(user.role)}
        className={cn(
          "flex items-center gap-2 bg-indigo-600 text-white px-4 py-2",
          "rounded-md hover:bg-indigo-700 transition-colors"
        )}
      >
        <Icon name="user" className="h-4 w-4" />
        <span>Dashboard</span>
      </Link>
    );
  }

  return (
    <Link
      to="/login"
      className={cn(
        "flex items-center gap-2 text-gray-300 hover:text-white",
        "px-3 py-2 rounded-md text-sm font-medium"
      )}
    >
      <Icon name="login" className="h-5 w-5" />
      <span>Login</span>
    </Link>
  );
}
