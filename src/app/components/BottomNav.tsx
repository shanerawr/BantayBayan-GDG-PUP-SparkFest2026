import { Bell, Navigation, Map, FileText, User } from 'lucide-react';
import type { AppPanel } from '../types';

interface Props {
  activePanel: AppPanel;
  onSelect: (panel: AppPanel) => void;
  unreadCount: number;
}

const tabs: { key: AppPanel; Icon: React.ElementType; label: string }[] = [
  { key: 'notifications', Icon: Bell, label: 'Notifs' },
  { key: 'routes', Icon: Navigation, label: 'Routes' },
  { key: null, Icon: Map, label: 'Map' },
  { key: 'reports', Icon: FileText, label: 'Reports' },
  { key: 'profile', Icon: User, label: 'Profile' },
];

export function BottomNav({ activePanel, onSelect, unreadCount }: Props) {
  return (
    <nav
      className="w-full bg-white border-t border-gray-200 flex items-center justify-around flex-shrink-0"
      style={{ height: 70, paddingBottom: 'env(safe-area-inset-bottom, 4px)' }}
    >
      {tabs.map(({ key, Icon, label }) => {
        const active = activePanel === key;
        return (
          <button
            key={label}
            onClick={() => onSelect(key)}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors"
            style={{ color: active ? '#111111' : '#9ca3af' }}
          >
            <div className="relative">
              <Icon size={23} strokeWidth={active ? 2.5 : 1.7} />
              {key === 'notifications' && unreadCount > 0 && (
                <span
                  className="absolute flex items-center justify-center bg-red-500 text-white font-extrabold rounded-full"
                  style={{ top: -6, right: -8, minWidth: 17, height: 17, fontSize: 10, paddingInline: 3 }}
                >
                  {unreadCount}
                </span>
              )}
            </div>
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
