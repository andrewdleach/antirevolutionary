<template>
  <div>
    <div id="header">
      <div>
        <h1>2026 Legislative Opportunities — Kitsap · Pierce · South King County</h1>
        <p>
          Every district is colored — all House seats are on the ballot every 2 years.
          <strong>Intensity</strong> = how open the opportunity is. Brighter = open seat or active challengers.
          Pastel = on-ballot but uncontested so far (hard, but a real race). Click any district for details.
        </p>
      </div>
      <NuxtLink to="/united-states" class="back-link">← Washington</NuxtLink>
    </div>

    <div id="map" />

    <div class="legend" id="legend">
      <h4>Opportunity level</h4>
      <div class="legend-item">
        <div class="swatch" style="background:#1a6aee;opacity:1" /><span>Open seat — no incumbent (D-lean)</span>
      </div>
      <div class="legend-item">
        <div class="swatch" style="background:#c7281a;opacity:1" /><span>Open seat — no incumbent (R-lean)</span>
      </div>
      <div class="legend-item">
        <div class="swatch" style="background:#4a9af0;opacity:0.8" /><span>Contested — challengers filed</span>
      </div>
      <div class="legend-item">
        <div class="swatch" style="background:#aac8f8" /><span>On ballot — uncontested so far</span>
      </div>
      <div class="legend-section">Gradient = D ← → R</div>
      <div class="legend-item" style="display:flex;gap:4px;align-items:center">
        <div style="width:80px;height:10px;border-radius:3px;background:linear-gradient(to right,#1a5fc7,#6a3daa,#c7281a);border:0.5px solid rgba(0,0,0,.1)" />
      </div>
      <div style="display:flex;justify-content:space-between;font-size:10px;color:#aaa;margin-top:2px">
        <span>D</span><span>R</span>
      </div>
    </div>

    <div class="loading-msg" id="loading-msg">
      <div class="spinner" />
      <div>Loading district boundaries from Census TIGER…</div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

useHead({
  title: '2026 South Sound Legislative Map — Antirevolutionary',
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css' },
  ],
  script: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js' },
  ],
})

const DISTRICTS: Record<string, any> = {
  '002': {
    name: 'LD 2', county: 'Pierce (S / Yelm–Lacey area)',
    openLevel: 2, dWeight: 0.15,
    seats: [
      { label: 'House Pos 1', status: 'contested', text: 'Andrew Barkis (R) running — William Dehnel (D) and William Rasmussen (Ind) have filed' },
      { label: 'House Pos 2', status: 'contested', text: 'Matt Marshall (R) running — Angela Taylor (D) has filed' },
      { label: 'Senate', status: 'notup', text: 'Paul Wagemann (R) — NOT up 2026 (elected 2024)' },
    ],
    note: 'Both House seats have Democratic challengers — a real but uphill race in an R-leaning district.',
  },
  '011': {
    name: 'LD 11', county: 'South King (Renton / Tukwila)',
    openLevel: 1, dWeight: 0.85,
    seats: [
      { label: 'House Pos 1', status: 'uncontested', text: 'David Hackney (D) running — no challengers announced yet' },
      { label: 'House Pos 2', status: 'uncontested', text: 'Steve Bergquist (D) running — no challengers announced yet' },
      { label: 'Senate', status: 'notup', text: 'Bob Hasegawa (D) — NOT up 2026 (elected 2024)' },
    ],
    note: 'Strongly D district. Both House incumbents running. No challengers yet — filing deadline May 4–8.',
  },
  '023': {
    name: 'LD 23', county: 'Kitsap (N — Bainbridge / Poulsbo / Kingston)',
    openLevel: 1, dWeight: 0.65,
    seats: [
      { label: 'House Pos 1', status: 'uncontested', text: 'Tarra Simmons (D) running — no challengers announced yet' },
      { label: 'House Pos 2', status: 'uncontested', text: 'Greg Nance (D) running — no challengers announced yet' },
      { label: 'Senate', status: 'notup', text: 'Yasmin Trudeau (D) — NOT up 2026 (elected 2024)' },
    ],
    note: 'Leans D. Both House incumbents running. Filing week still open — opportunity exists, especially for a strong R challenger on the peninsula.',
  },
  '025': {
    name: 'LD 25', county: 'Pierce (Puyallup / Sumner / Orting)',
    openLevel: 2, dWeight: 0.2,
    seats: [
      { label: 'House Pos 1', status: 'contested', text: 'Michael Keaton (R) running — Jenn Marie Strickling (D) has filed' },
      { label: 'House Pos 2', status: 'uncontested', text: 'Cyndy Jacobsen (R) running — no challenger yet; district voted Harris +0.5 in 2024' },
      { label: 'Senate', status: 'notup', text: 'Chris Gildon (R) — NOT up 2026 (elected 2024)' },
    ],
    note: 'District 25 is a subtle R-lean swing district (Harris barely won it in 2024). Pos 2 is uncontested but worth watching.',
  },
  '026': {
    name: 'LD 26', county: 'Pierce / Kitsap ⚡ SWING DISTRICT',
    openLevel: 3, dWeight: 0.55,
    seats: [
      { label: 'House Pos 1', status: 'contested', text: 'Adison Richards (D) running — David Olson (R) has filed' },
      { label: 'House Pos 2', status: 'open', text: '🔓 OPEN SEAT — Michelle Caldier Valdez (R) retiring. Katy Cornell (R), Renee Hernandez Greenfield (D), Rafe Sher (D) all in' },
      { label: 'Senate', status: 'contested', text: "Deb Krishnadasan (D) running — Gary Parker (R), Rafe Sher (D), Hernandez Greenfield (D) filed. One of Washington's only true swing seats." },
    ],
    note: 'The most competitive district in the region. House Pos 2 is a genuine open seat. The Senate race is already a 4-way fight. Expect significant outside money here.',
  },
  '027': {
    name: 'LD 27', county: 'Pierce (Central Tacoma)',
    openLevel: 1, dWeight: 0.82,
    seats: [
      { label: 'House Pos 1', status: 'uncontested', text: 'Laurie Jinkins (D) — Speaker of the House; no challengers announced yet' },
      { label: 'House Pos 2', status: 'uncontested', text: 'Jake Fey (D) — House Transportation Committee Chair; no challengers announced yet' },
      { label: 'Senate', status: 'notup', text: 'Jeannie Darneille (D) — NOT up 2026 (elected 2024)' },
    ],
    note: 'This is a hard challenge — Jinkins is Speaker and Fey chairs Transportation. But both seats ARE on the ballot and a challenger can still file before May 8.',
  },
  '028': {
    name: 'LD 28', county: 'Pierce (Lakewood / Joint Base Lewis–McChord)',
    openLevel: 1, dWeight: 0.72,
    seats: [
      { label: 'House Pos 1', status: 'uncontested', text: 'Mari Leavitt (D) — no challengers announced yet' },
      { label: 'House Pos 2', status: 'uncontested', text: 'Dan Bronoske (D) — no challengers announced yet' },
      { label: 'Senate', status: 'notup', text: "T'wina Nobles (D) — NOT up 2026 (elected 2024)" },
    ],
    note: 'Military-adjacent district. Leans D. No challengers yet — filing window still open through May 8.',
  },
  '029': {
    name: 'LD 29', county: 'Pierce (S Tacoma / Fife / Milton)',
    openLevel: 3, dWeight: 0.84,
    seats: [
      { label: 'House Pos 1', status: 'uncontested', text: 'Melanie Morgan (D) — no challengers announced yet' },
      { label: 'House Pos 2', status: 'open', text: '🔓 OPEN SEAT — Sharlett Mena (D) is running for Senate instead. Joe Bushnell (D), Patrick Stickney (D), Erin Chapman-Smith (D) have filed' },
      { label: 'Senate', status: 'open', text: '🔓 OPEN SEAT — Steve Conway (D) retiring. Sharlett Mena (D) declared; Melanie Morgan (D) endorsing Mena' },
    ],
    note: 'Two open seats in one district. Both are D-leaning, but open seats are always opportunities. A strong R challenger in a Tacoma-area district would be notable.',
  },
  '030': {
    name: 'LD 30', county: 'Pierce / South King (Federal Way)',
    openLevel: 2, dWeight: 0.62,
    seats: [
      { label: 'House Pos 1', status: 'uncontested', text: 'Jamila Taylor (D) — no challengers announced yet' },
      { label: 'House Pos 2', status: 'contested', text: 'Kristine Reeves (D) running — Paul McDaniel (Ind) and Mark Greene (R) have filed' },
      { label: 'Senate', status: 'contested', text: 'Claire Wilson (D) UP — Paul McDaniel (Ind) filed; this Senate seat is on the 2026 ballot' },
    ],
    note: 'Federal Way is a diverse, politically competitive area. Senate and House Pos 2 are contested. House Pos 1 still open for a challenger.',
  },
  '031': {
    name: 'LD 31', county: 'Pierce (SE — Bonney Lake / Buckley / Enumclaw area)',
    openLevel: 1, dWeight: 0.28,
    seats: [
      { label: 'House Pos 1', status: 'uncontested', text: 'Drew Stokesbary (R) — House Minority Leader; no challengers yet' },
      { label: 'House Pos 2', status: 'uncontested', text: 'Josh Penner (R) — no challengers yet' },
      { label: 'Senate', status: 'contested', text: 'Phil Fortunato (R) UP — Senate seat is on the 2026 ballot; no challengers announced yet' },
    ],
    note: 'R-leaning SE Pierce district. Senate seat is on the ballot. All three seats technically open for challengers through May 8. Harris +0 in 2024 shows some competitive potential.',
  },
  '033': {
    name: 'LD 33', county: 'South King (Des Moines / SeaTac / Covington)',
    openLevel: 1, dWeight: 0.88,
    seats: [
      { label: 'House Pos 1', status: 'uncontested', text: 'Edwin Obras (D) — no challengers yet' },
      { label: 'House Pos 2', status: 'uncontested', text: 'Mia Gregerson (D) — no challengers yet' },
      { label: 'Senate', status: 'contested', text: 'Tina Orwall (D) UP — Senate seat on the 2026 ballot; no challengers announced yet' },
    ],
    note: 'Strong D district near SeaTac airport. Senate seat is on the ballot — a credible challenger could make this interesting. All seats open through May 8.',
  },
  '034': {
    name: 'LD 34', county: 'South King (Burien / White Center / Normandy Park)',
    openLevel: 1, dWeight: 0.92,
    seats: [
      { label: 'House Pos 1', status: 'uncontested', text: 'Brianna Thomas (D) — no challengers yet' },
      { label: 'House Pos 2', status: 'uncontested', text: 'Joe Fitzgibbon (D) — no challengers yet' },
      { label: 'Senate', status: 'contested', text: 'Emily Alvarado (D) UP — Senate seat on the 2026 ballot; no challengers announced yet' },
    ],
    note: 'Very D district. Senate seat is on the ballot. Hard race for a challenger but all seats remain open through May 8.',
  },
  '035': {
    name: 'LD 35', county: 'Kitsap (S) / Mason County (Bremerton / Belfair)',
    openLevel: 1, dWeight: 0.22,
    seats: [
      { label: 'House Pos 1', status: 'uncontested', text: 'Dan Griffey (R) — no challengers yet' },
      { label: 'House Pos 2', status: 'uncontested', text: 'Travis Couture (R) — no challengers yet' },
      { label: 'Senate', status: 'contested', text: 'Drew MacEwen (R) UP — Senate seat on the 2026 ballot; no challengers announced yet' },
    ],
    note: 'R-leaning rural Kitsap/Mason district. Senate seat is on the ballot. A credible D challenger for any of the three seats would be the first in years.',
  },
  '047': {
    name: 'LD 47', county: 'South King (Auburn / Kent / Covington / Black Diamond)',
    openLevel: 1, dWeight: 0.72,
    seats: [
      { label: 'House Pos 1', status: 'uncontested', text: 'Debra Entenman (D) — no challengers yet' },
      { label: 'House Pos 2', status: 'uncontested', text: 'Chris Stearns (D) — no challengers yet' },
      { label: 'Senate', status: 'notup', text: 'Manka Dhingra (D) — NOT up 2026 (elected 2024)' },
    ],
    note: 'Leans D. Both House seats are on the ballot with incumbents running. No challengers yet — filing window is open through May 8.',
  },
}

const TIGER_URLS = [
  "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_Leg/MapServer/2/query?where=STATEFP%3D'53'&outFields=SLDLST%2CNAMELSAD&f=geojson&returnGeometry=true",
  "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_Leg/MapServer/0/query?where=STATEFP%3D'53'&outFields=SLDLST%2CNAMELSAD&f=geojson&returnGeometry=true",
  "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_Leg/MapServer/4/query?where=STATEFP%3D'53'&outFields=SLDLST%2CNAMELSAD&f=geojson&returnGeometry=true",
  "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_PhysicalFeatures/MapServer/2/query?where=STATEFP%3D'53'&outFields=SLDLST&f=geojson&returnGeometry=true",
]

function districtColors(d: any): [string, number] {
  if (!d) return ['#b8b8b0', 0.35]
  const r = Math.round(199 - 173 * d.dWeight)
  const g = Math.round(40 + 55 * d.dWeight)
  const b = Math.round(26 + 173 * d.dWeight)
  const opacityMap: Record<number, number> = { 3: 0.75, 2: 0.55, 1: 0.28 }
  return [`rgb(${r},${g},${b})`, opacityMap[d.openLevel] ?? 0.25]
}

function districtStyle(feature: any) {
  const raw = (feature.properties.SLDLST || feature.properties.DISTRICT || '').toString()
  const num = raw.replace(/^0+/, '').padStart(3, '0')
  const d = DISTRICTS[num]
  const [fillColor, fillOpacity] = districtColors(d)
  return { fillColor, color: 'rgba(0,0,0,0.35)', weight: d?.openLevel === 3 ? 2.5 : 1.5, fillOpacity }
}

function difficultyBadge(d: any): string {
  if (!d) return ''
  if (d.openLevel === 3) return `<div class="popup-difficulty diff-open">🟢 Active opportunity — open seats or challengers already filed</div>`
  if (d.openLevel === 2) return `<div class="popup-difficulty diff-medium">🟡 Contested — challengers have filed; incumbent is running</div>`
  return `<div class="popup-difficulty diff-hard">🔴 Uncontested so far — incumbent running; still open for filing until May 8</div>`
}

function makePopup(num3: string): string {
  const d = DISTRICTS[num3]
  if (!d) return `<b>LD ${parseInt(num3, 10)}</b><br><small style="color:#999">Outside coverage area</small>`
  let html = `<div class="popup-title">${d.name}</div><div class="popup-county">${d.county}</div>`
  html += difficultyBadge(d)
  html += '<div style="margin-top:7px">'
  d.seats.forEach((s: any) => {
    const cls = s.status === 'open' ? 'open' : s.status === 'contested' ? 'contested' : s.status === 'notup' ? 'notup' : ''
    html += `<div class="popup-seat ${cls}" style="margin-top:4px"><b>${s.label}:</b> ${s.text}</div>`
  })
  html += '</div>'
  if (d.note) html += `<div style="margin-top:7px;font-size:11px;color:#666;line-height:1.5;font-style:italic">${d.note}</div>`
  return html
}

let map: any = null
let geoLayer: any = null

function addGeoLayer(L: any, geojson: any) {
  const ourSet = new Set(Object.keys(DISTRICTS))
  const filtered = {
    type: 'FeatureCollection',
    features: geojson.features.filter((f: any) => {
      const raw = (f.properties.SLDLST || f.properties.DISTRICT || '').toString()
      return ourSet.has(raw.replace(/^0+/, '').padStart(3, '0'))
    }),
  }
  if (filtered.features.length === 0) { showFallback(L); return }

  geoLayer = L.geoJSON(filtered, {
    style: districtStyle,
    onEachFeature: (feature: any, layer: any) => {
      const num = (feature.properties.SLDLST || feature.properties.DISTRICT || '').toString().replace(/^0+/, '').padStart(3, '0')
      layer.bindPopup(makePopup(num), { maxWidth: 340, maxHeight: 400 })
      layer.on('mouseover', function (this: any) {
        const d = DISTRICTS[num]
        const [fc] = districtColors(d)
        this.setStyle({ weight: 3, fillColor: fc, fillOpacity: Math.min((d?.openLevel || 1) * 0.25 + 0.2, 0.9) })
        this.bringToFront()
      })
      layer.on('mouseout', function (this: any) { geoLayer.resetStyle(this) })
    },
  }).addTo(map)

  map.fitBounds(geoLayer.getBounds(), { padding: [20, 20] })
  const el = document.getElementById('loading-msg')
  if (el) el.style.display = 'none'
}

async function tryLoadGeo(L: any) {
  for (const url of TIGER_URLS) {
    try {
      const res = await fetch(url, { mode: 'cors' })
      if (!res.ok) continue
      const data = await res.json()
      if (data.features?.length > 5 && data.features[0].properties.SLDLST !== undefined) {
        addGeoLayer(L, data); return
      }
    } catch { continue }
  }
  showFallback(L)
}

function showFallback(L: any) {
  const el = document.getElementById('loading-msg')
  if (el) el.style.display = 'none'

  const errDiv = document.createElement('div')
  errDiv.className = 'error-msg'
  errDiv.innerHTML = `<strong>Running in sandbox — Census TIGER API blocked by CSP.</strong>
    In your own SPA environment this will load actual district polygons.
    Showing district-anchor city markers below (click for seat details).`
  document.getElementById('map')?.appendChild(errDiv)
  setTimeout(() => errDiv.remove(), 8000)

  const cities = [
    { lat: 47.74, lng: -122.65, num: '023', label: 'Poulsbo' },
    { lat: 47.63, lng: -122.52, num: '023', label: 'Bainbridge Is.' },
    { lat: 47.57, lng: -122.63, num: '026', label: 'Bremerton' },
    { lat: 47.54, lng: -122.64, num: '026', label: 'Port Orchard' },
    { lat: 47.32, lng: -122.58, num: '026', label: 'Gig Harbor' },
    { lat: 47.56, lng: -122.38, num: '035', label: 'Bremerton (35)' },
    { lat: 47.26, lng: -122.44, num: '027', label: 'Tacoma (LD27)' },
    { lat: 47.22, lng: -122.46, num: '029', label: 'S Tacoma (LD29)' },
    { lat: 47.16, lng: -122.52, num: '028', label: 'Lakewood' },
    { lat: 47.19, lng: -122.29, num: '025', label: 'Puyallup' },
    { lat: 47.18, lng: -122.18, num: '031', label: 'Bonney Lake' },
    { lat: 46.94, lng: -122.61, num: '002', label: 'Yelm' },
    { lat: 47.30, lng: -122.33, num: '030', label: 'Federal Way' },
    { lat: 47.41, lng: -122.32, num: '033', label: 'Des Moines' },
    { lat: 47.47, lng: -122.34, num: '034', label: 'Burien' },
    { lat: 47.31, lng: -122.23, num: '047', label: 'Auburn' },
    { lat: 47.38, lng: -122.24, num: '047', label: 'Kent' },
    { lat: 47.47, lng: -122.20, num: '011', label: 'Renton' },
  ]
  cities.forEach(c => {
    const d = DISTRICTS[c.num]
    const [fillColor, fillOpacity] = districtColors(d)
    const r = d?.openLevel === 3 ? 14 : d?.openLevel === 2 ? 11 : 8
    const m = L.circleMarker([c.lat, c.lng], {
      radius: r, fillColor, color: 'rgba(0,0,0,0.3)', weight: 1.5, fillOpacity: fillOpacity + 0.2,
    }).addTo(map)
    m.bindPopup(makePopup(c.num), { maxWidth: 340 })
    m.bindTooltip(`${c.label} — ${d?.name ?? ''}`, { permanent: false, direction: 'top' })
  })
}

onMounted(async () => {
  await nextTick()
  const L = await new Promise<any>(resolve => {
    if ((window as any).L) return resolve((window as any).L)
    const check = setInterval(() => {
      if ((window as any).L) { clearInterval(check); resolve((window as any).L) }
    }, 50)
    setTimeout(() => { clearInterval(check); resolve(null) }, 3000)
  })
  if (!L) return

  map = L.map('map').setView([47.35, -122.4], 9)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(map)

  await tryLoadGeo(L)
})
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; background: #f8f8f6; color: #1a1a18; }
#header { padding: .75rem 1rem; background: #fff; border-bottom: 0.5px solid #ddd; display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
#header h1 { font-size: 15px; font-weight: 500; }
#header p { font-size: 12px; color: #888; margin-top: 2px; max-width: 600px; line-height: 1.5; }
#map { height: calc(100vh - 90px); width: 100%; }
.legend { position: absolute; bottom: 20px; left: 10px; z-index: 1000; background: rgba(255,255,255,.97); border: 0.5px solid #ccc; border-radius: 8px; padding: .8rem 1rem; font-size: 12px; min-width: 200px; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
.legend h4 { font-size: 12px; font-weight: 500; margin-bottom: .6rem; color: #333; }
.legend-section { font-size: 10px; text-transform: uppercase; letter-spacing: .05em; color: #aaa; margin: .6rem 0 .3rem; }
.legend-item { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
.swatch { width: 16px; height: 12px; border-radius: 3px; border: 0.5px solid rgba(0,0,0,.15); flex-shrink: 0; }
.legend-item span { font-size: 11px; color: #555; }
.loading-msg { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); z-index: 2000; background: #fff; border: 0.5px solid #ddd; border-radius: 8px; padding: 1.5rem 2rem; text-align: center; font-size: 13px; }
.loading-msg .spinner { width: 22px; height: 22px; border: 2px solid #ddd; border-top-color: #444; border-radius: 50%; animation: spin .8s linear infinite; margin: 0 auto .75rem; }
@keyframes spin { to { transform: rotate(360deg); } }
.error-msg { position: absolute; top: 16px; left: 50%; transform: translateX(-50%); z-index: 2000; background: #fff; border: 0.5px solid #e8c060; border-radius: 8px; padding: .8rem 1.1rem; font-size: 12px; max-width: 400px; line-height: 1.6; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
.error-msg strong { display: block; margin-bottom: 3px; color: #7a4a00; }
.popup-title { font-size: 13px; font-weight: 600; margin-bottom: 2px; }
.popup-county { font-size: 11px; color: #999; margin-bottom: 7px; }
.popup-seat { font-size: 12px; margin-bottom: 4px; padding: 4px 8px; background: #f9f8f6; border-radius: 4px; line-height: 1.5; border: 0.5px solid #eee; }
.popup-seat.open { background: #fff8e6; border: 0.5px solid #e8c060; border-left: 3px solid #e8a020; }
.popup-seat.contested { background: #f0f5ff; border: 0.5px solid #c0d0f0; border-left: 3px solid #4a7be0; }
.popup-seat.notup { color: #aaa; font-size: 11px; }
.popup-difficulty { margin-top: 7px; padding: 4px 8px; font-size: 11px; border-radius: 4px; line-height: 1.5; }
.diff-hard { background: #fdf0f0; color: #a03030; border: 0.5px solid #f0c0c0; }
.diff-medium { background: #fff8e6; color: #7a4a00; border: 0.5px solid #f0d888; }
.diff-open { background: #f0fff4; color: #1a5a30; border: 0.5px solid #88d8a8; }
.back-link { font-size: 12px; color: #888; text-decoration: none; white-space: nowrap; padding: 0.25rem 0.5rem; border: 0.5px solid #ddd; border-radius: 4px; transition: color 0.15s, border-color 0.15s; }
.back-link:hover { color: #444; border-color: #bbb; }
</style>
