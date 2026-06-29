import { useState, useEffect, useRef, useCallback, Component } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { ChevronDown, Check, Locate, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { MapPin, HazardLevel, HazardFilter } from '../types';
import { HAZARD_COLORS } from '../types';

const GOOGLE_MAPS_API_KEY = "AIzaSyB2WFoRbVp3HPXHotn27e600KWnHJZZQ80";

const reportSvgPaths: Record<string, string> = {
  flood: 'M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z',
  'fallen-tree': 'M17 22H7M12 22v-5M9 13l3-3 3 3M8 17l4-4 4 4',
  'road-work': 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  'car-crash': 'M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 .6.4 1 1 1h2M7 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  'fallen-pole': 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  fire: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z',
  landslide: 'M8 3v10M3 13h10M16 18l4-4 4 4M20 14v8',
  other: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01',
};

const FILTERS: { key: HazardFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'minor', label: 'Minor' },
  { key: 'needs-attention', label: 'Needs Attention' },
  { key: 'urgent', label: 'Urgent' },
  { key: 'critical', label: 'Critical' },
];

interface Props {
  pins: MapPin[];
  onOpenDetail: (pin: MapPin) => void;
}

/* ── Error Boundary ── */
interface EBState { error: Error | null }
class MapErrorBoundary extends Component<{ children: React.ReactNode }, EBState> {
  state: EBState = { error: null };
  static getDerivedStateFromError(e: Error) { return { error: e }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, background: '#fef2f2', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#991b1b', marginBottom: 8 }}>Map Error</div>
          <div style={{ fontSize: 12, color: '#b91c1c', maxWidth: 320 }}>{this.state.error.message}</div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ── Filter Dropdown ── */
function FilterDropdown({ filter, onChange }: { filter: HazardFilter; onChange: (f: HazardFilter) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = FILTERS.find(f => f.key === filter)!;
  const activeColor = filter !== 'all' ? HAZARD_COLORS[filter as HazardLevel] : null;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative text-gray-800">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold shadow-lg border cursor-pointer"
        style={
          activeColor
            ? { background: activeColor.bg, borderColor: activeColor.bg, color: 'white' }
            : { background: 'white', borderColor: '#e5e7eb', color: '#111' }
        }
      >
        <span>Filter: {active.label}</span>
        <ChevronDown size={14} strokeWidth={2.5}
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-1/2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-[1001]"
            style={{ transform: 'translateX(-50%)', minWidth: 200 }}
          >
            {FILTERS.map(f => {
              const color = f.key !== 'all' ? HAZARD_COLORS[f.key as HazardLevel] : null;
              const isActive = filter === f.key;
              return (
                <button key={f.key} onClick={() => { onChange(f.key); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[13px] font-medium text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer"
                >
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color ? color.bg : '#9ca3af' }} />
                  <span className={isActive ? 'font-bold text-gray-900' : 'text-gray-700'}>{f.label}</span>
                  {isActive && <Check size={14} className="ml-auto text-gray-900" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Inner map component (rendered inside error boundary) ── */
function MapInner({ pins, onOpenDetail }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [filter, setFilter] = useState<HazardFilter>('all');
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(null);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);

  /* Load Google Maps once on mount */
  useEffect(() => {
    let cancelled = false;

    setOptions({ apiKey: GOOGLE_MAPS_API_KEY, version: 'weekly' });

    importLibrary('maps')
      .then(() => {
        if (cancelled || !mapRef.current) return;
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 14.5995, lng: 120.9842 },
          zoom: 13,
          disableDefaultUI: true,
          gestureHandling: 'greedy',
          clickableIcons: false,
        });
        mapInstanceRef.current = map;
        infoWindowRef.current = new google.maps.InfoWindow({ maxWidth: 240 });
        if (!cancelled) setLoaded(true);
      })
      .catch((e: Error) => {
        if (!cancelled) setLoadError(e.message);
      });

    return () => { cancelled = true; };
  }, []);

  /* Locate handler */
  const handleLocate = useCallback(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    navigator.geolocation?.getCurrentPosition(
      pos => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLoc(loc);
        map.panTo(loc);
        map.setZoom(16);
      },
      () => { 
        // Mock location for HTTP dev server testing
        const loc = { lat: 14.5995, lng: 120.9842 };
        setUserLoc(loc);
        map.panTo(loc); 
        map.setZoom(15); 
      }
    );
  }, []);

  /* Place user marker */
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!loaded || !map || !userLoc) return;

    if (!userMarkerRef.current) {
      const svg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#3b82f6" fill-opacity="0.2"/>
        <circle cx="12" cy="12" r="8" fill="#ffffff"/>
        <circle cx="12" cy="12" r="6" fill="#3b82f6"/>
      </svg>`;
      userMarkerRef.current = new google.maps.Marker({
        map,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
          scaledSize: new google.maps.Size(24, 24),
          anchor: new google.maps.Point(12, 12),
        },
        zIndex: 999,
        title: "Your Location"
      });
    }
    userMarkerRef.current.setPosition(userLoc);
  }, [loaded, userLoc]);

  /* Place / refresh markers */
  useEffect(() => {
    const map = mapInstanceRef.current;
    const iw = infoWindowRef.current;
    if (!loaded || !map || !iw) return;

    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    const visible = filter === 'all' ? pins : pins.filter(p => p.hazardLevel === filter);

    visible.forEach(pin => {
      const { bg } = HAZARD_COLORS[pin.hazardLevel];
      const path = reportSvgPaths[pin.type] ?? reportSvgPaths['other'];

      // Build SVG data-URL icon
      const svgStr = [
        `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="44" viewBox="0 0 32 44">`,
        `<path d="M16 2C9.373 2 4 7.373 4 14C4 23 16 40 16 40C16 40 28 23 28 14C28 7.373 22.627 2 16 2Z"`,
        ` fill="${bg}" stroke="white" stroke-width="2"/>`,
        `<circle cx="16" cy="14" r="7" fill="white" fill-opacity="0.25"/>`,
        `<svg x="10" y="8" width="12" height="12" viewBox="0 0 24 24" fill="none"`,
        ` stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">`,
        `<path d="${path}"/></svg>`,
        `</svg>`,
      ].join('');

      const icon: google.maps.Icon = {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svgStr),
        scaledSize: new google.maps.Size(32, 44),
        anchor: new google.maps.Point(16, 44),
      };

      const marker = new google.maps.Marker({ map, position: { lat: pin.lat, lng: pin.lng }, icon, title: pin.title });

      marker.addListener('click', () => {
        const div = document.createElement('div');
        div.style.cssText = 'width:260px;display:flex;flex-direction:column;font-family:system-ui,sans-serif;';
        div.innerHTML = `
          <style>
            .gm-style-iw-c { 
              padding: 0 !important; 
              border-radius: 16px !important; 
              background: rgba(255, 255, 255, 0.9) !important; 
              backdrop-filter: blur(16px) !important;
              -webkit-backdrop-filter: blur(16px) !important;
              box-shadow: 0 10px 40px -10px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.5) !important;
              overflow: hidden !important;
            }
            .gm-style-iw-d { 
              padding: 0 !important; 
              margin: 0 !important; 
              overflow: hidden !important; 
            }
            .gm-style-iw-chr { 
              position: absolute !important; 
              top: 0 !important; right: 0 !important; 
              z-index: 10 !important;
            }
            .gm-ui-hover-effect { 
              position: absolute !important;
              top: 12px !important; right: 12px !important; transform: scale(0.65); 
              background: #ffffff !important; 
              border-radius: 50%; 
              box-shadow: 0 4px 12px rgba(0,0,0,0.4) !important;
            }
            .gm-ui-hover-effect span { 
              margin: 0 !important; 
              position: absolute !important; 
              top: 50% !important; left: 50% !important; 
              transform: translate(-50%, -50%) !important; 
            }
          </style>
          <div style="position:relative; width:100%; height:120px; background:linear-gradient(to bottom, transparent, rgba(0,0,0,0.4)), url('https://picsum.photos/seed/${pin.id}/400/200') center/cover;">
             <div style="position:absolute; top:0; left:0; background:${bg}; color:#fff; font-size:10px; font-weight:800; padding:6px 12px; border-radius:0 0 16px 0; text-transform:uppercase; letter-spacing:0.5px; box-shadow:0 2px 8px rgba(0,0,0,0.2); z-index: 5;">
               ${pin.hazardLevel.replace('-', ' ')}
             </div>
          </div>
          <div style="padding:16px; display:flex; flex-direction:column; gap:6px;">
            <div style="font-size:15px; font-weight:800; color:#111827; line-height:1.2;">${pin.title}</div>
            <div style="font-size:12px; color:#4b5563; margin-bottom:6px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${pin.description}</div>
            
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:2px;">
              <div style="display:flex; align-items:center; gap:6px;">
                <div style="width:20px; height:20px; border-radius:10px; background:#e5e7eb; display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:bold; color:#4b5563;">
                  ${pin.reportedBy.slice(0, 2).toUpperCase()}
                </div>
                <span style="font-size:10px; color:#6b7280; font-weight:600;">${pin.timeAgo}</span>
              </div>
              <button id="vm-${pin.id}" style="background:linear-gradient(135deg, #3b82f6, #2563eb); color:white; font-size:11px; font-weight:700; padding:6px 14px; border:none; border-radius:20px; cursor:pointer; box-shadow:0 4px 12px rgba(37,99,235,0.3);">
                View Details
              </button>
            </div>
          </div>`;

        iw.setContent(div);
        iw.open(map, marker);

        setTimeout(() => {
          document.getElementById(`vm-${pin.id}`)?.addEventListener('click', () => {
            iw.close();
            onOpenDetail(pin);
          });
        }, 100);
      });

      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach(m => m.setMap(null));
      markersRef.current = [];
    };
  }, [loaded, pins, filter, onOpenDetail]);

  if (loadError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <AlertTriangle className="text-yellow-500 mb-3" size={32} />
        <p className="font-bold text-sm text-gray-900 mb-1">Google Maps failed to load</p>
        <p className="text-xs text-gray-500 max-w-xs">{loadError}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full z-0">
      <div ref={mapRef} className="w-full h-full" />

      {!loaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div className="absolute top-3 left-0 right-0 z-[1000] flex justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <FilterDropdown filter={filter} onChange={setFilter} />
        </div>
      </div>

      <button onClick={handleLocate}
        className="absolute right-3 bottom-3 z-[1000] w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition-transform cursor-pointer"
      >
        <Locate size={18} />
      </button>
    </div>
  );
}

/* ── Public export wrapped in error boundary ── */
export function MapView(props: Props) {
  return (
    <MapErrorBoundary>
      <MapInner {...props} />
    </MapErrorBoundary>
  );
}
