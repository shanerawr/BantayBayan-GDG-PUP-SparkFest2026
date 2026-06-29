import { CheckCircle, Bell, Globe, Shield, LogOut, ChevronRight } from 'lucide-react';

interface Props {
  language: 'en' | 'fil';
  onLanguageToggle: () => void;
}

const t = {
  en: {
    profile: 'Profile',
    verified: 'Verified Account',
    settings: 'Settings',
    notifications: 'Notification Settings',
    language: 'Language',
    langValue: 'English',
    privacy: 'Privacy & Safety',
    about: 'About BantayBayan',
    logout: 'Log Out',
    reports: 'reports submitted',
    upvotes: 'upvotes received',
    since: 'Member since June 2026',
  },
  fil: {
    profile: 'Profile',
    verified: 'Verified na Account',
    settings: 'Mga Setting',
    notifications: 'Mga Setting ng Notipikasyon',
    language: 'Wika',
    langValue: 'Filipino',
    privacy: 'Privacy at Kaligtasan',
    about: 'Tungkol sa BantayBayan',
    logout: 'Mag-logout',
    reports: 'mga ulat na isinumite',
    upvotes: 'upvotes na natanggap',
    since: 'Miyembro mula Hunyo 2026',
  },
};

export function ProfileView({ language, onLanguageToggle }: Props) {
  const tx = t[language];

  return (
    <div className="absolute inset-0 bg-gray-50 z-40 flex flex-col">
      <div className="px-4 pt-5 pb-3 bg-white border-b border-gray-100">
        <h2 className="text-[20px] font-extrabold text-gray-900">{tx.profile}</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* User card */}
        <div className="bg-white px-4 py-5 mb-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[22px] font-bold">JD</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[17px] font-bold text-gray-900">Juan dela Cruz</p>
                <CheckCircle size={16} className="text-blue-500 flex-shrink-0" />
              </div>
              <p className="text-[13px] text-gray-500">@juandelacruz</p>
              <p className="text-[12px] text-gray-400 mt-0.5">{tx.since}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 mt-3 pt-3 border-t border-gray-100">
            <div className="text-center">
              <p className="text-[20px] font-bold text-gray-900">12</p>
              <p className="text-[11px] text-gray-500">{tx.reports}</p>
            </div>
            <div className="w-px bg-gray-100" />
            <div className="text-center">
              <p className="text-[20px] font-bold text-gray-900">87</p>
              <p className="text-[11px] text-gray-500">{tx.upvotes}</p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white mb-3">
          <div className="px-4 py-2 border-b border-gray-50">
            <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wider">{tx.settings}</p>
          </div>

          <SettingsRow Icon={Bell} label={tx.notifications} />
          <SettingsRow
            Icon={Globe}
            label={tx.language}
            value={tx.langValue}
            onClick={onLanguageToggle}
          />
          <SettingsRow Icon={Shield} label={tx.privacy} />
        </div>

        <div className="bg-white mb-3">
          <SettingsRow Icon={CheckCircle} label={tx.about} />
        </div>

        {/* Logout */}
        <div className="px-4 pb-6">
          <button className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 rounded-2xl py-3.5 text-[14px] font-semibold">
            <LogOut size={16} />
            {tx.logout}
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsRow({
  Icon,
  label,
  value,
  onClick,
}: {
  Icon: React.ElementType;
  label: string;
  value?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 active:bg-gray-100 transition-colors"
    >
      <Icon size={18} className="text-gray-500 flex-shrink-0" />
      <span className="flex-1 text-left text-[14px] text-gray-800">{label}</span>
      {value && <span className="text-[13px] text-gray-400">{value}</span>}
      <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
    </button>
  );
}
