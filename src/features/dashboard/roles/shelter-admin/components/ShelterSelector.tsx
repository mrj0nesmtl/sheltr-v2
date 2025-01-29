import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/auth/stores/authStore';
import { SignOutButton } from '@/components/ui/SignOutButton';
import { Building2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export const ShelterSelector = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [shelters, setShelters] = useState<Array<{id: string, name: string}>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load shelters on mount
  useEffect(() => {
    const loadShelters = async () => {
      if (!user?.id) return;

      try {
        console.log('Loading shelters for:', user.id);
        const { data, error } = await supabase
          .from('organization_staff')
          .select(`
            organization_id,
            organizations!inner (
              id,
              name
            )
          `)
          .eq('user_id', user.id)
          .eq('role', 'shelter_admin')
          .eq('status', 'active');

        if (error) throw error;

        const shelterList = data.map(item => ({
          id: item.organizations.id,
          name: item.organizations.name
        }));

        console.log('Loaded shelters:', shelterList);
        setShelters(shelterList);

        // Auto-navigate if only one shelter
        if (shelterList.length === 1) {
          handleShelterSelect(shelterList[0].id);
        }
      } catch (err) {
        console.error('Failed to load shelters:', err);
        setError('Failed to load shelters');
      } finally {
        setLoading(false);
      }
    };

    loadShelters();
  }, [user?.id]);

  const handleShelterSelect = async (shelterId: string) => {
    try {
      setLoading(true);
      console.log('Selected shelter:', shelterId);

      // Simple navigation - we'll verify access in the dashboard
      navigate(`/dashboard/shelter/${shelterId}`);
    } catch (err) {
      console.error('Navigation failed:', err);
      setError('Failed to access shelter');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Select a Shelter
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          {shelters.map((shelter) => (
            <button
              key={shelter.id}
              onClick={() => handleShelterSelect(shelter.id)}
              className="p-6 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <Building2 className="w-8 h-8 text-green-500 mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">
                {shelter.name}
              </h2>
              <p className="text-slate-400">Click to manage</p>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center text-slate-400">
          <SignOutButton />
        </div>
      </div>
    </main>
  );
}; 