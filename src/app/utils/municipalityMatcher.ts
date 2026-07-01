// Standardized Municipality Matcher for BantayBayan
// Focuses heavily on Metro Manila (NCR) 17 cities/municipalities, handling abbreviations,
// aliases, and common barangay/district names where Google Maps reverse geocoding omits the city name.

const METRO_MANILA_GROUPS: Record<string, { name: string; aliases: string[] }> = {
  malabon: {
    name: 'Malabon City',
    aliases: [
      'malabon', 'potrero', 'longos', 'tonsuya', 'catmon', 'tinajeron', 'maysilo', 
      'hulong duhat', 'dampalit', 'concepcion malabon', 'baritan', 'bayan-bayanan', 
      'flores malabon', 'niugan', 'pangarap', 'santolan malabon', 'tañong malabon', 
      'tugatog', 'acacia malabon', 'ibayo malabon'
    ]
  },
  quezon: {
    name: 'Quezon City',
    aliases: [
      'quezon city', 'qc', 'cubao', 'diliman', 'commonwealth', 'katipunan', 'fairview', 
      'novaliches', 'kamuning', 'project 2', 'project 3', 'project 4', 'project 6', 
      'project 8', 'roces', 'timog', 'morato', 'east ave', 'north ave', 'tandang sora', 
      'holy spirit', 'batasan', 'lagro', 'la loma', 'galas', 'krungthai', 'bagumbayan qc', 
      'libis', 'eastwood', 'vertis', 'bago bantay', 'kamuning'
    ]
  },
  manila: {
    name: 'City of Manila',
    aliases: [
      'manila', 'city of manila', 'tondo', 'sampaloc', 'ermita', 'malate', 'quiapo', 
      'binondo', 'intramuros', 'santa cruz manila', 'sta. cruz manila', 'paco', 
      'pandacan', 'port area', 'san andres', 'santa ana manila', 'sta. ana manila', 
      'rodriguez manila', 'ust', 'divisoria', 'recto', 'taft manila', 'roxas blvd', 
      'espanola', 'gagalangin', 'morayta'
    ]
  },
  makati: {
    name: 'Makati City',
    aliases: [
      'makati', 'ayala ave', 'ayala center', 'bel-air', 'poblacion makati', 'guadalupe', 
      'magallanes makati', 'bangkal makati', 'cembo', 'rembo', 'pitogo', 'pembo', 'embo', 
      'comembo', 'south cembo', 'san antonio makati', 'san lorenzo makati', 'salcedo village', 
      'legaspi village', 'rockwell', 'urdaneta village', 'forbes park', 'dasmarinas village'
    ]
  },
  taguig: {
    name: 'Taguig City',
    aliases: [
      'taguig', 'bgc', 'bonifacio global city', 'fort bonifacio', 'mckinley', 'ususan', 
      'bicutan taguig', 'lower bicutan', 'upper bicutan', 'western bicutan', 'signal village', 
      'hagonoy taguig', 'tuktukan', 'bambang taguig', 'ligid', 'napindan', 'ibayo-tipas'
    ]
  },
  pasig: {
    name: 'Pasig City',
    aliases: [
      'pasig', 'ortigas center', 'kapitolyo', 'rosario pasig', 'caniogan', 'manggahan pasig', 
      'ugong pasig', 'bagong ilog', 'bagong katipunan', 'bambang pasig', 'buting', 
      'kalawaan', 'maybunga', 'palatiw', 'pinagbuhatan', 'sagad', 'san antonio pasig', 
      'san joaquin pasig', 'san miguel pasig', 'santolan pasig', 'sumilang'
    ]
  },
  caloocan: {
    name: 'Caloocan City',
    aliases: [
      'caloocan', 'monumento', 'bagong silang', 'grace park', 'camarin', 'deparo', 
      'talipapa', 'bagbaguin caloocan', 'maypajo', 'sangandaan caloocan', 'tala caloocan', 
      'kaunlaran', 'morning breeze'
    ]
  },
  mandaluyong: {
    name: 'Mandaluyong City',
    aliases: [
      'mandaluyong', 'shaw blvd', 'boni ave', 'greenfield district', 'wack-wack', 'barangka mandaluyong', 
      'highway hills', 'mauway', 'plainview', 'addition hills mandaluyong', 'vergara', 
      'namayan', 'malamig', 'daang bakal'
    ]
  },
  marikina: {
    name: 'Marikina City',
    aliases: [
      'marikina', 'concepcion marikina', 'tumana', 'parang marikina', 'nangka', 'malanday marikina', 
      'sto. nino marikina', 'santa elena marikina', 'tañong marikina', 'barangka marikina', 
      'fortune marikina', 'industrial valley'
    ]
  },
  paranaque: {
    name: 'Parañaque City',
    aliases: [
      'paranaque', 'parañaque', 'bf homes', 'sucat paranaque', 'bicutan paranaque', 
      'baclaran paranaque', 'don bosco paranaque', 'moonwalk', 'tambo paranaque', 
      'vitalez', 'san dionisio', 'san isidro paranaque', 'san martin de porres', 'merville', 'sun valley'
    ]
  },
  las_pinas: {
    name: 'Las Piñas City',
    aliases: [
      'las pinas', 'las piñas', 'almanza', 'pamplona las pinas', 'pulang lupa', 
      'talon las pinas', 'zapote las pinas', 'elias aldanese', 'manuyo', 'pilar las pinas'
    ]
  },
  valenzuela: {
    name: 'Valenzuela City',
    aliases: [
      'valenzuela', 'karuhatan', 'gen. t. de leon', 'malinta', 'marulas', 'ugong valenzuela', 
      'dalandanan', 'lawang bato', 'lingunan', 'canumay', 'bagbaguin valenzuela', 
      'punta valenzuela', 'polo valenzuela', 'maysan', 'veinte reales'
    ]
  },
  navotas: {
    name: 'Navotas City',
    aliases: [
      'navotas', 'north bay boulevard', 'tangos navotas', 'tanza navotas', 'sipac-almacen', 
      'san jose navotas', 'san roque navotas', 'daanghari navotas', 'bangkulasi', 
      'bagumbayan north', 'bagumbayan south', 'navotas east', 'navotas west'
    ]
  },
  muntinlupa: {
    name: 'Muntinlupa City',
    aliases: [
      'muntinlupa', 'alabang', 'sucat muntinlupa', 'ayala alabang', 'putatan', 'cupang muntinlupa', 
      'tunasan', 'buli muntinlupa', 'poblacion muntinlupa', 'bayanan muntinlupa'
    ]
  },
  pasay: {
    name: 'Pasay City',
    aliases: [
      'pasay', 'moa', 'mall of asia', 'taft pasay', 'newport city', 'villamor airbase', 
      'baclaran pasay', 'malibay', 'san roque pasay', 'santa clara pasay', 'san jose pasay', 'san rafael pasay'
    ]
  },
  san_juan: {
    name: 'San Juan City',
    aliases: [
      'san juan city', 'city of san juan', 'greenhills', 'little baguio', 'addition hills san juan', 
      'corazon de jesus', 'ermitaño', 'kabayanan', 'maytunas', 'onse', 'st. joseph san juan', 
      'santa lucia san juan', 'tibagan', 'west crame'
    ]
  },
  pateros: {
    name: 'Municipality of Pateros',
    aliases: [
      'pateros', 'aguho', 'magtanggol', 'martires del 96', 'poblacion pateros', 
      'san roque pateros', 'santa ana pateros', 'st. peter pateros', 'tabacalera'
    ]
  }
};

export function inferMunicipalityFromAddress(addressInput?: string): string {
  if (!addressInput) return 'Unknown Municipality';
  // Remove regional terms like 'Metro Manila' so that searching for 'manila' (City of Manila) doesn't false-positive on other NCR cities
  const text = addressInput.toLowerCase().replace(/(metro manila|national capital region|\bncr\b|philippines)/ig, ' ');
  
  // Check Metro Manila LGU groups first
  for (const { name, aliases } of Object.values(METRO_MANILA_GROUPS)) {
    for (const alias of aliases) {
      if (text.includes(alias)) {
        return name;
      }
    }
  }

  // Fallback: Try extracting city from comma-separated address format
  // e.g., "123 Street, San Fernando City, Pampanga, Philippines"
  const parts = addressInput.split(',').map(p => p.trim());
  for (const part of parts) {
    if (part.toLowerCase().includes('city') || part.toLowerCase().includes('municipality')) {
      return part;
    }
  }

  if (parts.length >= 2) {
    return parts[parts.length - 2]; // usually city or province in standard geocoder results
  }

  return parts[0] || 'Unknown Municipality';
}

export function matchMunicipality(userMuniInput?: string, reportLocInput?: string, isBarangayRole?: boolean): boolean {
  if (!userMuniInput) return true;
  
  const rawMuni = userMuniInput.toLowerCase();
  // Strip administrative qualifiers and location suffixes
  const cleanMuni = rawMuni
    .replace(/(city of|city|municipality of|municipality|,|philippines|metro manila|ncr)/ig, '')
    .trim();
    
  if (!cleanMuni) return true;
  
  // Remove regional terms like 'Metro Manila' so that City of Manila ('manila') doesn't match 'Quezon City, Metro Manila'
  const reportText = (reportLocInput || '').toLowerCase().replace(/(metro manila|national capital region|\bncr\b|philippines)/ig, ' ');
  if (!reportText.trim()) return false;

  // If this is a barangay role or if userMuni explicitly mentions a barangay/brgy/zone/district, check specific barangay keyword
  const isBrgy = isBarangayRole || /(barangay|brgy|barrio|zone|district)/i.test(rawMuni);
  if (isBrgy) {
    let brgyKeyword = rawMuni;
    for (const [key, group] of Object.entries(METRO_MANILA_GROUPS)) {
      brgyKeyword = brgyKeyword.replace(new RegExp(group.name, 'ig'), ' ');
      brgyKeyword = brgyKeyword.replace(new RegExp(key.replace('_', ' '), 'ig'), ' ');
    }
    brgyKeyword = brgyKeyword
      .replace(/(barangay|brgy\.|brgy|barrio|zone|district|city of|city|municipality of|municipality|,|\.|philippines|metro manila|ncr|qc)/ig, ' ')
      .trim();

    if (brgyKeyword.length >= 1) {
      // Direct word or substring match against reportText for this specific barangay
      return reportText.includes(brgyKeyword);
    }
  }

  // Direct substring check
  if (reportText.includes(cleanMuni)) return true;
  if (cleanMuni === 'qc' && (reportText.includes('quezon city') || reportText.includes('cubao') || reportText.includes('diliman'))) return true;

  // Check Metro Manila LGU groups for alias / barangay matching
  for (const [key, group] of Object.entries(METRO_MANILA_GROUPS)) {
    // Check if user belongs to this LGU group
    const isThisGroup = cleanMuni.includes(key) || 
      (key === 'quezon' && (cleanMuni === 'qc' || cleanMuni.includes('quezon'))) ||
      (key === 'las_pinas' && (cleanMuni.includes('las pinas') || cleanMuni.includes('las piñas'))) ||
      (key === 'san_juan' && cleanMuni.includes('san juan'));

    if (isThisGroup) {
      // If user is in this LGU group, see if any alias or barangay in this group appears in the report text
      for (const alias of group.aliases) {
        if (reportText.includes(alias)) {
          return true;
        }
      }
    }
  }

  return false;
}
