import { LandscapeThumb } from './LandscapeThumb';
import type { AppNotification } from '../types';

interface Props {
  notifications: AppNotification[];
  onMarkAllRead: () => void;
}

function NotifItem({ n }: { n: AppNotification }) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-gray-100 last:border-0">
      <LandscapeThumb className="w-[72px] h-[72px] rounded-xl" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          {n.isNew && (
            <span className="text-[9px] font-extrabold bg-black text-white px-1.5 py-0.5 rounded tracking-widest uppercase">
              New
            </span>
          )}
        </div>
        <p className="text-[13px] font-bold text-gray-900 leading-snug">{n.title}</p>
        {n.subtitle && <p className="text-[12px] text-gray-500">{n.subtitle}</p>}
        <p className="text-[12px] text-gray-500">{n.detail}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">{n.timeAgo}</p>
      </div>
      <button className="text-gray-300 mt-1 px-1 text-[18px] leading-none">···</button>
    </div>
  );
}

export function NotificationsPanel({ notifications, onMarkAllRead }: Props) {
  return (
    <div className="absolute inset-0 bg-white z-40 flex flex-col">
      <div className="px-4 pt-5 pb-3 border-b border-gray-100">
        <h2 className="text-[20px] font-extrabold text-gray-900">Recent Notifications</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        {notifications.map(n => <NotifItem key={n.id} n={n} />)}
      </div>

      <div className="px-4 py-4 border-t border-gray-100">
        <button
          onClick={onMarkAllRead}
          className="text-[13px] text-gray-500 underline underline-offset-2 block mx-auto"
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
}
