import { SignOutButton } from '@/components/ui/SignOutButton';

export function ShelterAdminDashboard() {
  // ... existing code ...

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <SignOutButton />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ... rest of the dashboard content ... */}
      </div>
    </div>
  );
} 