import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { MapView } from './components/MapView';

import { BottomNav } from './components/BottomNav';
import { NotificationsPanel } from './components/NotificationsPanel';
import { RoutesView } from './components/RoutesView';
import { ReportsView } from './components/ReportsView';
import { ProfileView } from './components/ProfileView';
import { AddReportModal } from './components/AddReportModal';
import { ReportDetailPanel } from './components/ReportDetailPanel';
import { AddRouteModal } from './components/AddRouteModal';
import { mockPins, mockRoutes, mockNotifications, mockUserReports } from './mockData';
import type { AppPanel, MapPin } from './types';

export default function App() {
  const [activePanel, setActivePanel] = useState<AppPanel>(null);
  const [showAddReport, setShowAddReport] = useState(false);
  const [showAddRoute, setShowAddRoute] = useState(false);
  const [detailPin, setDetailPin] = useState<MapPin | null>(null);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [language, setLanguage] = useState<'en' | 'fil'>('en');

  const unreadCount = notifications.filter(n => n.isNew).length;

  const handlePanelSelect = (panel: AppPanel) => {
    setActivePanel(prev => prev === panel ? null : panel);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400">
      {/*
        Phone shell uses flex-col so the BottomNav is a real flex child
        sitting BELOW the content area. Panels live inside the content area
        and can never overlap the nav no matter their z-index.
      */}
      <div
        className="flex flex-col bg-white overflow-hidden"
        style={{ width: '100%', maxWidth: 430, height: '100dvh' }}
      >
        {/* ── Content area (map + panels) ── */}
        <div className="flex-1 relative overflow-hidden min-h-0">

          {/* Map — always the base layer */}
          <div className="absolute inset-0">
            <MapView
              pins={mockPins}
              onOpenDetail={pin => { setActivePanel(null); setDetailPin(pin); }}
            />
          </div>

          {/* Pages — shown instantly when a nav tab is selected */}
          {activePanel === 'notifications' && (
            <NotificationsPanel
              notifications={notifications}
              onMarkAllRead={() =>
                setNotifications(prev => prev.map(n => ({ ...n, isNew: false })))
              }
            />
          )}
          {activePanel === 'routes' && (
            <RoutesView
              routes={mockRoutes}
              onAddRoute={() => { setActivePanel(null); setShowAddRoute(true); }}
            />
          )}
          {activePanel === 'reports' && (
            <ReportsView
              reports={mockUserReports}
              onAddReport={() => { setActivePanel(null); setShowAddReport(true); }}
            />
          )}
          {activePanel === 'profile' && (
            <ProfileView
              language={language}
              onLanguageToggle={() => setLanguage(l => l === 'en' ? 'fil' : 'en')}
            />
          )}
        </div>

        {/* ── Bottom nav — always rendered in document flow, never overlapped ── */}
        <BottomNav
          activePanel={activePanel}
          onSelect={handlePanelSelect}
          unreadCount={unreadCount}
        />
      </div>

      {/*
        Full-screen modals are rendered OUTSIDE the phone shell's flex layout
        and positioned fixed so they can cover everything including the nav.
        They are placed outside so they don't disrupt the flex-col structure.
      */}
      <AnimatePresence>
        {detailPin && (
          <ReportDetailPanel
            key="detail"
            pin={detailPin}
            onClose={() => setDetailPin(null)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showAddRoute && (
          <AddRouteModal
            key="add-route"
            onClose={() => setShowAddRoute(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showAddReport && (
          <AddReportModal
            key="add-report"
            onClose={() => setShowAddReport(false)}
            onSubmit={() => setShowAddReport(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
