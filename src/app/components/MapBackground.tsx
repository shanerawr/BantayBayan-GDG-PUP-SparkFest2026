export function MapBackground() {
  return (
    <svg
      viewBox="0 0 400 800"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Base land */}
      <rect width="400" height="800" fill="#f0ebe0" />

      {/* Manila Bay – left strip */}
      <path d="M 0 0 L 52 0 L 50 150 L 46 300 L 38 450 L 28 600 L 12 750 L 0 800 Z" fill="#aed6f1" opacity="0.85" />

      {/* Pasig River */}
      <path
        d="M 50 238 Q 140 228 240 242 Q 310 248 400 240 L 400 258 Q 310 264 240 258 Q 140 246 50 256 Z"
        fill="#aed6f1"
        opacity="0.9"
      />

      {/* ── City blocks ── */}
      {/* Row 0: y 4–96 */}
      <rect x="58" y="4" width="48" height="92" fill="#e3dcd2" rx="2" />
      <rect x="116" y="4" width="68" height="92" fill="#e3dcd2" rx="2" />
      <rect x="194" y="4" width="62" height="92" fill="#e3dcd2" rx="2" />
      <rect x="266" y="4" width="54" height="92" fill="#e3dcd2" rx="2" />
      <rect x="330" y="4" width="68" height="92" fill="#e3dcd2" rx="2" />

      {/* Row 1: y 102–192 */}
      <rect x="58" y="102" width="48" height="86" fill="#e3dcd2" rx="2" />
      <rect x="116" y="102" width="68" height="86" fill="#e3dcd2" rx="2" />
      <rect x="194" y="102" width="62" height="86" fill="#e3dcd2" rx="2" />
      <rect x="266" y="102" width="54" height="86" fill="#e3dcd2" rx="2" />
      <rect x="330" y="102" width="68" height="86" fill="#e3dcd2" rx="2" />

      {/* Row 2: y 198–233 (above Pasig) */}
      <rect x="58" y="198" width="48" height="35" fill="#e3dcd2" rx="2" />
      <rect x="116" y="198" width="68" height="35" fill="#e3dcd2" rx="2" />
      <rect x="194" y="198" width="62" height="35" fill="#e3dcd2" rx="2" />
      <rect x="266" y="198" width="54" height="35" fill="#e3dcd2" rx="2" />
      <rect x="330" y="198" width="68" height="35" fill="#e3dcd2" rx="2" />

      {/* Row 3: y 262–390 */}
      <rect x="58" y="262" width="48" height="124" fill="#e3dcd2" rx="2" />
      <rect x="116" y="262" width="68" height="124" fill="#e3dcd2" rx="2" />
      <rect x="194" y="262" width="62" height="124" fill="#e3dcd2" rx="2" />
      <rect x="266" y="262" width="54" height="124" fill="#e3dcd2" rx="2" />
      <rect x="330" y="262" width="68" height="124" fill="#e3dcd2" rx="2" />

      {/* Row 4: y 396–478 — Luneta park on left block */}
      <rect x="58" y="396" width="48" height="78" fill="#b8dba8" rx="3" /> {/* Luneta Park */}
      <rect x="116" y="396" width="68" height="78" fill="#e3dcd2" rx="2" />
      <rect x="194" y="396" width="62" height="78" fill="#e3dcd2" rx="2" />
      <rect x="266" y="396" width="54" height="78" fill="#e3dcd2" rx="2" />
      <rect x="330" y="396" width="68" height="78" fill="#e3dcd2" rx="2" />

      {/* Row 5: y 484–568 — Paco Park */}
      <rect x="58" y="484" width="48" height="80" fill="#e3dcd2" rx="2" />
      <rect x="116" y="484" width="68" height="80" fill="#e3dcd2" rx="2" />
      <rect x="194" y="484" width="62" height="80" fill="#b8dba8" rx="3" /> {/* Paco Park */}
      <rect x="266" y="484" width="54" height="80" fill="#e3dcd2" rx="2" />
      <rect x="330" y="484" width="68" height="80" fill="#e3dcd2" rx="2" />

      {/* Row 6: y 574–796 */}
      <rect x="58" y="574" width="48" height="222" fill="#e3dcd2" rx="2" />
      <rect x="116" y="574" width="68" height="222" fill="#e3dcd2" rx="2" />
      <rect x="194" y="574" width="62" height="222" fill="#e3dcd2" rx="2" />
      <rect x="266" y="574" width="54" height="222" fill="#e3dcd2" rx="2" />
      <rect x="330" y="574" width="68" height="222" fill="#e3dcd2" rx="2" />

      {/* ── Major roads (horizontal) ── */}
      <rect x="0" y="98" width="400" height="4" fill="white" opacity="0.95" />
      <rect x="0" y="194" width="400" height="4" fill="white" opacity="0.95" />
      <rect x="0" y="392" width="400" height="4" fill="white" opacity="0.95" />
      <rect x="0" y="480" width="400" height="4" fill="white" opacity="0.95" />
      <rect x="0" y="570" width="400" height="4" fill="white" opacity="0.95" />

      {/* ── Major roads (vertical) ── */}
      <rect x="106" y="0" width="4" height="800" fill="white" opacity="0.95" />
      <rect x="184" y="0" width="4" height="800" fill="white" opacity="0.95" />
      <rect x="256" y="0" width="4" height="800" fill="white" opacity="0.95" />
      <rect x="320" y="0" width="4" height="800" fill="white" opacity="0.95" />

      {/* ── Minor roads ── */}
      <rect x="0" y="48" width="400" height="2" fill="white" opacity="0.45" />
      <rect x="0" y="148" width="400" height="2" fill="white" opacity="0.45" />
      <rect x="0" y="300" width="400" height="2" fill="white" opacity="0.45" />
      <rect x="0" y="340" width="400" height="2" fill="white" opacity="0.45" />
      <rect x="0" y="640" width="400" height="2" fill="white" opacity="0.45" />
      <rect x="0" y="720" width="400" height="2" fill="white" opacity="0.45" />
      <rect x="145" y="0" width="2" height="800" fill="white" opacity="0.45" />
      <rect x="220" y="0" width="2" height="800" fill="white" opacity="0.45" />
      <rect x="290" y="0" width="2" height="800" fill="white" opacity="0.45" />
      <rect x="362" y="0" width="2" height="800" fill="white" opacity="0.45" />

      {/* ── Park labels ── */}
      <text x="82" y="436" textAnchor="middle" fontSize="7" fill="#2e7d32" fontFamily="Arial, sans-serif" fontWeight="bold">Luneta</text>
      <text x="82" y="447" textAnchor="middle" fontSize="7" fill="#2e7d32" fontFamily="Arial, sans-serif" fontWeight="bold">Park</text>
      <text x="225" y="527" textAnchor="middle" fontSize="7" fill="#2e7d32" fontFamily="Arial, sans-serif" fontWeight="bold">Paco Park</text>

      {/* ── Main city label ── */}
      <text x="230" y="328" textAnchor="middle" fontSize="26" fill="#b0a898" fontFamily="Georgia, serif" opacity="0.7" fontStyle="italic">Manila</text>

      {/* ── District labels ── */}
      <text x="238" y="60" textAnchor="middle" fontSize="10" fill="#7a7060" fontFamily="Arial, sans-serif" opacity="0.9">Tondo</text>
      <text x="145" y="152" textAnchor="middle" fontSize="9" fill="#7a7060" fontFamily="Arial, sans-serif" opacity="0.9">Binondo</text>
      <text x="82" y="348" textAnchor="middle" fontSize="9" fill="#7a7060" fontFamily="Arial, sans-serif" opacity="0.9">Intramuros</text>
      <text x="82" y="540" textAnchor="middle" fontSize="9" fill="#7a7060" fontFamily="Arial, sans-serif" opacity="0.9">Malate</text>
      <text x="355" y="210" textAnchor="middle" fontSize="9" fill="#7a7060" fontFamily="Arial, sans-serif" opacity="0.9">Sampaloc</text>
      <text x="225" y="550" textAnchor="middle" fontSize="9" fill="#7a7060" fontFamily="Arial, sans-serif" opacity="0.9">Paco</text>
      <text x="82" y="165" textAnchor="middle" fontSize="9" fill="#7a7060" fontFamily="Arial, sans-serif" opacity="0.9">Ermita</text>

      {/* ── Bay label ── */}
      <text
        x="24" y="420"
        textAnchor="middle" fontSize="8" fill="#4a9cc5" fontFamily="Arial, sans-serif" opacity="0.9"
        transform="rotate(-90, 24, 420)"
      >Manila Bay</text>
    </svg>
  );
}
