import { useState } from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import { LandscapeThumb } from './LandscapeThumb';
import type { UserReport } from '../types';

interface Props {
  reports: UserReport[];
  onAddReport: () => void;
  onEditReport?: (report: UserReport) => void;
  onDeleteReport?: (reportId: string, pinId: string) => void;
}

const statusStyle: Record<string, string> = {
  pending: 'border-blue-400 text-blue-600 bg-blue-50',
  acknowledged: 'border-blue-400 text-blue-600 bg-blue-50',
  'in-progress': 'border-amber-400 text-amber-600 bg-amber-50',
  resolved: 'border-green-400 text-green-600 bg-green-50',
  confirmed: 'border-black text-black',
  rejected: 'border-red-400 text-red-500',
};

function ReportCard({ 
  report, 
  onEdit, 
  onDelete 
}: { 
  report: UserReport, 
  onEdit?: () => void, 
  onDelete?: () => void 
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isResolved = report.status === 'resolved';
  const displayStatus = isResolved ? 'Resolved' : 'Active';
  const activeStyle = isResolved ? statusStyle.resolved : statusStyle.pending;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-3.5 py-3 mb-3 shadow-sm relative">
      <div className="flex items-start gap-3">
        {report.photo || (report.photos && report.photos.length > 0) ? (
          <img src={report.photos?.[0] || report.photo} alt="Thumbnail" className="w-[72px] h-[72px] rounded-xl object-cover" />
        ) : (
          <LandscapeThumb className="w-[72px] h-[72px] rounded-xl" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-gray-900">{report.typeName}</p>
              <p className="text-[12px] text-gray-500">{report.moreDetails}</p>
            </div>
            <span className={`flex-shrink-0 text-[11px] font-bold border rounded-full px-2.5 py-0.5 ${activeStyle}`}>
              {displayStatus}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">{report.date}</p>
          <p className="text-[11px] text-gray-500">{report.time}</p>
          <div className="flex items-center justify-between mt-0.5">
            <p className="text-[11px] text-gray-400 truncate flex-1">{report.location}</p>
            
            {report.status === 'pending' && (
              <div className="relative">
                <button 
                  className="text-gray-400 pl-2 cursor-pointer hover:text-gray-600" 
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <MoreHorizontal size={16} />
                </button>
                {menuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)}></div>
                    <div className="absolute right-0 bottom-full mb-1 w-32 bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden z-50">
                      <button 
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                        onClick={() => { setMenuOpen(false); onEdit?.(); }}
                      >
                        Edit Report
                      </button>
                      <button 
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium border-t border-gray-100"
                        onClick={() => { setMenuOpen(false); onDelete?.(); }}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
            {report.status !== 'pending' && (
              <div className="text-gray-400 pl-2 opacity-0"><MoreHorizontal size={16} /></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReportsView({ reports, onAddReport, onEditReport, onDeleteReport }: Props) {
  return (
    <div className="absolute inset-0 bg-gray-50 z-40 flex flex-col">
      <div className="px-4 pt-5 pb-3 bg-white border-b border-gray-100">
        <h2 className="text-[20px] font-extrabold text-gray-900">My Reports</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-24">
        {reports.map(r => (
          <ReportCard 
            key={r.id} 
            report={r} 
            onEdit={() => onEditReport?.(r)}
            onDelete={() => onDeleteReport?.(r.id, r.pinId)}
          />
        ))}
      </div>

      <button
        onClick={onAddReport}
        className="absolute bottom-6 right-5 h-14 px-6 bg-black text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ease-in-out active:scale-95 cursor-pointer gap-2"
      >
        <span className="font-extrabold text-[14px] tracking-wide whitespace-nowrap">
          Add Report
        </span>
        <Plus size={20} className="flex-shrink-0" />
      </button>
    </div>
  );
}
