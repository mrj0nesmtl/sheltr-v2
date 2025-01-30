import { Link } from 'react-scroll';
import { 
  BarChart3, // Analytics/Metrics
  Activity,  // Platform Status
  Globe2,    // Global Impact
  History,   // Transactions
  Coins,     // Token Metrics
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { 
    id: 'analytics-section',
    label: 'Analytics',
    icon: BarChart3,
    iconColor: 'text-indigo-400',
  },
  { 
    id: 'global-impact',
    label: 'Global Impact',
    icon: Globe2,
    iconColor: 'text-sky-400',
  },
  { 
    id: 'transactions',
    label: 'Transactions',
    icon: History,
    iconColor: 'text-violet-400',
  },
  { 
    id: 'token',
    label: 'Token Metrics',
    icon: Coins,
    iconColor: 'text-amber-400',
  },
  { 
    id: 'platform-status',
    label: 'Platform Status',
    icon: Activity,
    iconColor: 'text-emerald-400',
  },
];

export function ImpactSidebar({ className }: { className?: string }) {
  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 w-64 bg-gray-800/95 backdrop-blur-sm",
        "transform transition-all duration-200 ease-in-out z-30",
        "border-r border-gray-700/50",
        className
      )}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-700/50">
          <h2 className="text-lg font-semibold text-white">Navigation</h2>
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              spy={true}
              smooth={true}
              offset={-64}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-gray-300",
                "hover:text-white hover:bg-gray-700/50 rounded-lg",
                "transition-all duration-200 ease-in-out",
                "cursor-pointer group"
              )}
              activeClass="bg-gray-700/70 text-white shadow-lg shadow-gray-900/20"
            >
              <item.icon 
                className={cn(
                  "w-5 h-5 flex-shrink-0 transition-transform duration-200",
                  "group-hover:scale-110",
                  item.iconColor // Always colored icon
                )} 
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700/50">
          <div className="text-xs text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </aside>
  );
} 